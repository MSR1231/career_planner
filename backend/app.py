from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os
import hashlib
from datetime import datetime
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# OpenAI API key for voice chat (you'll need to add this to your .env file)
openai.api_key = os.getenv('OPENAI_API_KEY', '')

DATA_DIR = "data"

def load_json(fn): 
    try:
        return json.load(open(os.path.join(DATA_DIR, fn)))
    except:
        return []

def save_json(fn, data): 
    json.dump(data, open(os.path.join(DATA_DIR, fn), "w"), indent=2)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Enhanced login with personalized response
@app.route("/api/login", methods=["POST"])
def login():
    users = load_json("users.json")
    data = request.get_json()
    
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"success": False, "message": "Email and password required"}), 400
    
    for u in users:
        if u["email"] == data["email"] and u["password"] == data["password"]:
            # Add personalized welcome message based on class
            welcome_msg = get_personalized_welcome(u)
            return jsonify({
                "success": True, 
                "user": u, 
                "welcomeMessage": welcome_msg
            }), 200
    
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

# Enhanced signup with detailed user information
@app.route("/api/signup", methods=["POST"])
def signup():
    users = load_json("users.json")
    data = request.get_json()
    
    required_fields = ["email", "password", "username", "fullName", "age", "currentClass", "interests"]
    if not data or not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "All fields are required"}), 400
    
    if any(u["email"] == data["email"] for u in users):
        return jsonify({"success": False, "message": "Email already exists"}), 400
    
    # Add additional user metadata
    user_data = {
        **data,
        "registrationDate": datetime.now().isoformat(),
        "profileComplete": True,
        "preferences": get_default_preferences(data.get("currentClass", "10")),
        "progressTracking": init_progress_tracking(data.get("currentClass", "10"))
    }
    
    users.append(user_data)
    save_json("users.json", users)
    return jsonify({"success": True, "message": "Registration successful!"}), 200

def get_personalized_welcome(user):
    class_level = user.get("currentClass", "10")
    name = user.get("fullName", user.get("username", "Student"))
    
    if class_level == "10":
        return f"Welcome back, {name}! Ready to explore your career options after 10th? Let's discover the perfect stream for you!"
    elif class_level == "12":
        return f"Hello {name}! Time to make those important career decisions. Let's find the ideal college and course for your future!"
    else:
        return f"Welcome {name}! Let's continue your educational journey together."

def get_default_preferences(class_level):
    base_prefs = {
        "language": "english",
        "voiceEnabled": True,
        "notifications": True,
        "studyReminders": True
    }
    
    if class_level == "10":
        base_prefs["focusAreas"] = ["stream_selection", "career_exploration", "study_tips"]
    else:
        base_prefs["focusAreas"] = ["college_selection", "entrance_exams", "career_planning"]
    
    return base_prefs

def init_progress_tracking(class_level):
    if class_level == "10":
        return {
            "completedSections": [],
            "currentGoals": ["Explore career streams", "Take aptitude quiz"],
            "lastActivity": datetime.now().isoformat()
        }
    else:
        return {
            "completedSections": [],
            "currentGoals": ["Research colleges", "Plan entrance exams"],
            "lastActivity": datetime.now().isoformat()
        }

# Personalized colleges based on user class and interests
@app.route("/api/colleges")
def colleges():
    user_email = request.args.get('user_email')
    user_class = request.args.get('user_class', '12')
    user_interests = request.args.get('interests', '').split(',')
    
    colleges_data = load_json("colleges.json")
    
    # Filter and personalize colleges based on user profile
    if user_class == "10":
        # For 10th class, show more general information
        for college in colleges_data:
            college["relevanceScore"] = calculate_relevance_10th(college, user_interests)
    else:
        # For 12th class, show detailed admission requirements
        for college in colleges_data:
            college["relevanceScore"] = calculate_relevance_12th(college, user_interests)
    
    # Sort by relevance
    colleges_data.sort(key=lambda x: x.get("relevanceScore", 0), reverse=True)
    
    return jsonify(colleges_data[:20])  # Return top 20 relevant colleges

def calculate_relevance_10th(college, interests):
    # Simple relevance calculation for 10th class students
    score = 50  # base score
    if any(interest.lower() in college.get("streams", []) for interest in interests):
        score += 30
    return score

def calculate_relevance_12th(college, interests):
    # More detailed relevance for 12th class students
    score = 50
    if any(interest.lower() in college.get("specializations", []) for interest in interests):
        score += 40
    return score

# Enhanced career paths with class-specific recommendations
@app.route("/api/career-paths")
def career_paths():
    user_class = request.args.get('user_class', '12')
    user_stream = request.args.get('stream', 'science')
    
    career_data = load_json("career_paths_detailed.json")
    
    # Filter based on class and stream
    if user_class == "10":
        # Show stream selection and general career overview
        filtered_data = [career for career in career_data if career.get("suitable_after_10th", True)]
    else:
        # Show specific career paths based on stream
        filtered_data = [career for career in career_data if user_stream.lower() in career.get("streams", [])]
    
    # Add personalized insights
    for career in filtered_data:
        career["personalizedInsight"] = generate_career_insight(career, user_class, user_stream)
    
    return jsonify(filtered_data)

def generate_career_insight(career, user_class, user_stream):
    if user_class == "10":
        return f"This career path typically requires {career.get('recommended_stream', 'any stream')} in 11th-12th."
    else:
        return f"With your {user_stream} background, this career offers {career.get('growth_potential', 'excellent')} growth prospects."

# New endpoint for study materials
@app.route("/api/study-materials")
def study_materials():
    user_class = request.args.get('user_class', '10')
    subject = request.args.get('subject', 'all')
    
    materials = load_json("study_materials.json")
    
    # Filter by class
    filtered_materials = [m for m in materials if user_class in m.get("applicable_classes", [])]
    
    # Filter by subject if specified
    if subject != 'all':
        filtered_materials = [m for m in filtered_materials if subject.lower() in [s.lower() for s in m.get("subjects", [])]]
    
    return jsonify(filtered_materials)

# New endpoint for exam guides
@app.route("/api/exam-guides")
def exam_guides():
    user_class = request.args.get('user_class', '12')
    stream = request.args.get('stream', 'all')
    
    guides = load_json("exam_guides.json")
    
    # Filter based on class and stream
    filtered_guides = []
    for guide in guides:
        if user_class in guide.get("applicable_classes", []):
            if stream == 'all' or stream.lower() in [s.lower() for s in guide.get("streams", [])]:
                filtered_guides.append(guide)
    
    return jsonify(filtered_guides)

# Voice chat endpoint
@app.route("/api/voice-chat", methods=["POST"])
def voice_chat():
    data = request.get_json()
    user_message = data.get("message", "")
    user_profile = data.get("userProfile", {})
    chat_history = data.get("chatHistory", [])
    
    try:
        # Create context-aware prompt based on user profile
        system_prompt = create_personalized_prompt(user_profile)
        
        # Prepare messages for OpenAI
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add chat history
        for msg in chat_history[-5:]:  # Last 5 messages for context
            messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
        
        # Add current message
        messages.append({"role": "user", "content": user_message})
        
        # Call OpenAI API (you can replace this with any other AI service)
        if openai.api_key:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=200,
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
        else:
            # Fallback response if no API key
            ai_response = generate_fallback_response(user_message, user_profile)
        
        return jsonify({
            "success": True,
            "response": ai_response,
            "timestamp": datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "fallbackResponse": generate_fallback_response(user_message, user_profile)
        }), 500

def create_personalized_prompt(user_profile):
    class_level = user_profile.get("currentClass", "12")
    name = user_profile.get("fullName", "Student")
    interests = user_profile.get("interests", [])
    
    base_prompt = f"""You are an experienced career counselor and mentor specifically helping Indian students. 
    You're currently helping {name}, who is in class {class_level}.
    
    Student's interests: {', '.join(interests) if interests else 'Not specified'}
    
    Guidelines:
    - Be encouraging and supportive
    - Provide practical, actionable advice
    - Focus on Indian education system and career paths
    - Consider the student's current class level in your responses
    - Keep responses concise but informative (under 200 words)
    - If asked about specific exams or colleges, provide accurate information
    - Be culturally sensitive and understand Indian student challenges
    
    If the student is in class 10th, focus on:
    - Stream selection (Science PCM/PCB, Commerce, Arts)
    - General career exploration
    - Study techniques and time management
    
    If the student is in class 12th, focus on:
    - College selection and entrance exams
    - Specific career paths based on their stream
    - Application processes and deadlines
    """
    
    return base_prompt

def generate_fallback_response(user_message, user_profile):
    """Generate a simple rule-based response when AI API is not available"""
    class_level = user_profile.get("currentClass", "12")
    name = user_profile.get("fullName", "Student")
    
    message_lower = user_message.lower()
    
    if "career" in message_lower:
        if class_level == "10":
            return f"Hi {name}! For career exploration after 10th, consider your interests and strengths. Science PCM is great for engineering, PCB for medical, Commerce for business careers, and Arts offers creative and civil service opportunities. What subjects do you enjoy most?"
        else:
            return f"Hello {name}! Career planning after 12th depends on your stream. I can help you explore college options, entrance exams, and specific career paths. What field interests you most?"
    
    elif "exam" in message_lower or "test" in message_lower:
        return f"I can help you with entrance exam information! For class {class_level} students, there are several important exams to consider. Would you like to know about JEE, NEET, or other competitive exams?"
    
    elif "college" in message_lower:
        return f"College selection is crucial for your future! I can help you find colleges based on your stream, location preferences, and career goals. What type of college are you looking for?"
    
    else:
        return f"Hi {name}! I'm here to help with your career planning and educational journey. You can ask me about career options, colleges, entrance exams, study materials, or any other educational guidance you need."

# Enhanced mentors with personalized matching
@app.route("/api/mentors")
def mentors():
    user_class = request.args.get('user_class', '12')
    user_stream = request.args.get('stream', 'science')
    
    mentor_data = load_json("mentors.json")
    
    # Add compatibility scores based on user profile
    for mentor in mentor_data:
        mentor["compatibilityScore"] = calculate_mentor_compatibility(mentor, user_class, user_stream)
    
    # Sort by compatibility
    mentor_data.sort(key=lambda x: x.get("compatibilityScore", 0), reverse=True)
    
    return jsonify(mentor_data)

def calculate_mentor_compatibility(mentor, user_class, user_stream):
    score = 50  # base score
    
    # Higher score for mentors specializing in user's stream
    if user_stream.lower() in mentor.get("specialization", []):
        score += 30
    
    # Bonus for mentors with experience in user's education level
    if user_class == "10" and "career_guidance" in mentor.get("specialization", []):
        score += 20
    elif user_class == "12" and "college_admission" in mentor.get("specialization", []):
        score += 20
    
    return score

# User progress tracking
@app.route("/api/user-progress", methods=["GET", "POST"])
def user_progress():
    if request.method == "POST":
        data = request.get_json()
        user_email = data.get("userEmail")
        progress_data = data.get("progressData")
        
        users = load_json("users.json")
        for user in users:
            if user["email"] == user_email:
                user["progressTracking"] = progress_data
                user["lastActivity"] = datetime.now().isoformat()
                break
        
        save_json("users.json", users)
        return jsonify({"success": True})
    
    else:
        user_email = request.args.get("user_email")
        users = load_json("users.json")
        
        for user in users:
            if user["email"] == user_email:
                return jsonify(user.get("progressTracking", {}))
        
        return jsonify({}), 404

# Existing endpoints with minor enhancements...
@app.route("/api/internships")
def internships(): 
    user_class = request.args.get('user_class', '12')
    internships_data = load_json("internships.json")
    
    # Filter internships suitable for the user's class level
    filtered_internships = [i for i in internships_data if user_class in i.get("suitable_for_class", ["12"])]
    
    return jsonify(filtered_internships)

@app.route("/api/scholarships")
def scholarships(): 
    user_class = request.args.get('user_class', '12')
    scholarships_data = load_json("scholarships.json")
    
    # Filter scholarships applicable to user's class
    filtered_scholarships = [s for s in scholarships_data if user_class in s.get("applicable_classes", ["10", "12"])]
    
    return jsonify(filtered_scholarships)

@app.route("/api/mentorsignup", methods=["POST"])
def mentorsignup():
    mentors = load_json("mentors_real.json")
    data = request.get_json()
    
    if not data:
        return jsonify({"success": False, "message": "Invalid data"}), 400
    
    data["id"] = len(mentors) + 1
    data["registrationDate"] = datetime.now().isoformat()
    data["verified"] = False  # New mentors need verification
    
    mentors.append(data)
    save_json("mentors_real.json", mentors)
    return jsonify({"success": True})

# Enhanced quiz with personalized questions
@app.route("/api/quiz")
def quiz():
    user_class = request.args.get('user_class', '10')
    quiz_data = load_json("quiz_questions.json")
    
    # Filter questions based on class level
    if user_class == "10":
        filtered_questions = [q for q in quiz_data if q.get("suitable_for_class_10", True)]
    else:
        filtered_questions = [q for q in quiz_data if q.get("suitable_for_class_12", True)]
    
    return jsonify(filtered_questions)

@app.route("/api/quiz/submit", methods=["POST"])
def submit_quiz():
    data = request.get_json()
    answers = data.get("answers", [])
    user_profile = data.get("userProfile", {})
    
    # Enhanced recommendation logic
    recommendations = generate_personalized_recommendations(answers, user_profile)
    
    return jsonify({
        "success": True,
        "recommendations": recommendations,
        "personalizedMessage": generate_quiz_result_message(user_profile, recommendations)
    })

def generate_personalized_recommendations(answers, user_profile):
    class_level = user_profile.get("currentClass", "12")
    
    # Count different types of interests
    science_count = sum(1 for ans in answers if ans in ["Science", "Yes", "Practical", "Laboratory"])
    tech_count = sum(1 for ans in answers if ans in ["Technology", "Computer", "Programming"])
    arts_count = sum(1 for ans in answers if ans in ["Arts", "Creative", "Writing"])
    commerce_count = sum(1 for ans in answers if ans in ["Business", "Finance", "Management"])
    
    recommendations = []
    
    if class_level == "10":
        # Stream recommendations for 10th class
        if science_count >= 3:
            recommendations.extend(["Science PCM Stream", "Science PCB Stream", "Engineering Preparation"])
        if tech_count >= 2:
            recommendations.extend(["Computer Science", "Information Technology"])
        if commerce_count >= 2:
            recommendations.extend(["Commerce Stream", "Business Studies"])
        if arts_count >= 2:
            recommendations.extend(["Arts/Humanities Stream", "Creative Arts"])
    else:
        # Career recommendations for 12th class
        if science_count >= 3:
            recommendations.extend(["Engineering Colleges", "Medical Colleges", "Research Programs"])
        if tech_count >= 2:
            recommendations.extend(["IT/CS Programs", "Data Science", "Software Development"])
        if commerce_count >= 2:
            recommendations.extend(["BBA/MBA Programs", "CA/CS Courses", "Finance Programs"])
        if arts_count >= 2:
            recommendations.extend(["Liberal Arts", "Mass Communication", "Design Programs"])
    
    return recommendations[:5] if recommendations else ["General Studies", "Skill Development Programs"]

def generate_quiz_result_message(user_profile, recommendations):
    name = user_profile.get("fullName", "Student")
    class_level = user_profile.get("currentClass", "12")
    
    if class_level == "10":
        return f"Great job, {name}! Based on your responses, these streams align well with your interests and aptitude. Take time to explore each option before making your final decision."
    else:
        return f"Excellent, {name}! These career paths match your profile. Research these options thoroughly and consider entrance exam requirements."

@app.route("/api/motivation")
def motivation(): 
    user_class = request.args.get('user_class', '12')
    
    if user_class == "10":
        quotes = [
            "The future belongs to those who choose wisely today! 🌟",
            "Your 10th results don't define you, your choices do! 💪",
            "Every expert was once a beginner - choose your stream and excel! ✨",
            "Dream big, choose smart, work hard! 🎯",
            "Your journey to success starts with the right stream selection! 🚀"
        ]
    else:
        quotes = [
            "College admissions are just the beginning of your journey! 🎓",
            "Hard work beats talent when talent doesn't work hard! 💪",
            "Your entrance exam preparation today shapes your career tomorrow! 📚",
            "Success is where preparation meets opportunity! ⭐",
            "The best time to plant a tree was 20 years ago. The second best time is now! 🌱"
        ]
    
    return jsonify(quotes)

@app.route("/api/timeline")
def timeline(): 
    user_class = request.args.get('user_class', '12')
    
    if user_class == "10":
        timeline_data = [
            {"event": "Stream Selection Deadline", "date": "2025-09-30", "status": "urgent", "description": "Choose your subjects for 11th-12th"},
            {"event": "Career Counseling Week", "date": "2025-10-15", "status": "upcoming", "description": "Free career guidance sessions"},
            {"event": "School Application Deadline", "date": "2025-10-30", "status": "upcoming", "description": "Apply for 11th admission"},
            {"event": "Aptitude Test Registration", "date": "2025-11-15", "status": "upcoming", "description": "Register for stream selection tests"}
        ]
    else:
        timeline_data = [
            {"event": "College Application Start", "date": "2025-09-20", "status": "urgent", "description": "Begin college application process"},
            {"event": "JEE Main Registration", "date": "2025-10-01", "status": "urgent", "description": "Register for JEE Main 2026"},
            {"event": "NEET Registration", "date": "2025-10-15", "status": "upcoming", "description": "NEET 2026 registration opens"},
            {"event": "Scholarship Deadlines", "date": "2025-11-01", "status": "upcoming", "description": "Apply for merit scholarships"}
        ]
    
    return jsonify(timeline_data)

if __name__ == "__main__": 
    app.run(debug=True, port=5000)