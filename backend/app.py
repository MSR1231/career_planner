from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os
import hashlib

app = Flask(__name__)
CORS(app)

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

@app.route("/api/login", methods=["POST"])
def login():
    users = load_json("users.json")
    data = request.get_json()
    
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"success": False, "message": "Email and password required"}), 400
    
    for u in users:
        if u["email"] == data["email"] and u["password"] == data["password"]:
            return jsonify({"success": True, "username": u["username"], "email": u["email"]}), 200
    
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route("/api/signup", methods=["POST"])
def signup():
    users = load_json("users.json")
    data = request.get_json()
    
    if not data or not data.get("email") or not data.get("password") or not data.get("username"):
        return jsonify({"success": False, "message": "All fields required"}), 400
    
    if any(u["email"] == data["email"] for u in users):
        return jsonify({"success": False, "message": "Email already exists"}), 400
    
    users.append(data)
    save_json("users.json", users)
    return jsonify({"success": True}), 200

@app.route("/api/colleges")
def colleges(): 
    colleges_data = load_json("colleges.json")
    # Fix data structure for frontend compatibility
    for college in colleges_data:
        if isinstance(college.get("fees"), str):
            # Convert string fees to object structure expected by frontend
            college["fees"] = {
                "General": college["fees"],
                "OBC": college["fees"], 
                "SC": college["fees"]
            }
        if isinstance(college.get("cutoff"), str):
            # Convert string cutoff to object structure
            college["cutoff"] = {
                "General": "65-80",
                "OBC": "60-75", 
                "SC": "55-70"
            }
    return jsonify(colleges_data)

@app.route("/api/internships")
def internships(): 
    return jsonify(load_json("internships.json"))

@app.route("/api/scholarships")
def scholarships(): 
    return jsonify(load_json("scholarships.json"))

@app.route("/api/mentors")
def mentors(): 
    # Return proper mentor data instead of quiz questions
    mentor_data = [
        {
            "id": 1,
            "name": "Dr. Sarah Ahmed",
            "college": "NIT Srinagar",
            "expertise": "Computer Science & AI",
            "contact": "sarah.ahmed@nitsri.ac.in",
            "experience": "8 years",
            "specialization": ["Machine Learning", "Data Science", "Career Guidance"]
        },
        {
            "id": 2,
            "name": "Prof. Rajesh Kumar",
            "college": "University of Jammu",
            "expertise": "Mechanical Engineering",
            "contact": "rajesh.kumar@ju.ac.in",
            "experience": "12 years",
            "specialization": ["Automotive", "Design", "Manufacturing"]
        },
        {
            "id": 3,
            "name": "Dr. Fatima Khan",
            "college": "Government Medical College Srinagar",
            "expertise": "Medical Sciences",
            "contact": "fatima.khan@gmcs.edu.in",
            "experience": "10 years",
            "specialization": ["General Medicine", "Healthcare", "Medical Career Guidance"]
        },
        {
            "id": 4,
            "name": "Mr. Arjun Singh",
            "college": "University of Kashmir", 
            "expertise": "Business & Commerce",
            "contact": "arjun.singh@uok.edu.in",
            "experience": "6 years",
            "specialization": ["Finance", "Marketing", "Entrepreneurship"]
        }
    ]
    return jsonify(mentor_data)

@app.route("/api/mentorsignup", methods=["POST"])
def mentorsignup():
    mentors = load_json("mentors_real.json")  # Use different file for real mentors
    data = request.get_json()
    
    if not data:
        return jsonify({"success": False, "message": "Invalid data"}), 400
    
    # Add ID for new mentor
    data["id"] = len(mentors) + 1
    mentors.append(data)
    save_json("mentors_real.json", mentors)
    return jsonify({"success": True})

@app.route("/api/quiz")
def quiz(): 
    return jsonify(load_json("quiz_questions.json"))

@app.route("/api/quiz/submit", methods=["POST"])
def submit_quiz():
    data = request.get_json()
    
    # Simple career recommendation logic based on answers
    answers = data.get("answers", [])
    
    # Career recommendation logic
    science_count = sum(1 for ans in answers if ans in ["Science", "Yes", "Practical", "Laboratory"])
    tech_count = sum(1 for ans in answers if ans in ["Yes"] and "technology" in str(data).lower())
    arts_count = sum(1 for ans in answers if ans in ["Arts", "Creative"])
    
    recommendations = []
    if science_count >= 3:
        recommendations.extend(["Engineering", "Medical", "Research Scientist"])
    if tech_count >= 2:
        recommendations.extend(["Software Developer", "Data Scientist", "Cybersecurity"])
    if arts_count >= 2:
        recommendations.extend(["Graphic Designer", "Content Writer", "Artist"])
    
    if not recommendations:
        recommendations = ["Business Administration", "Teaching", "Government Jobs"]
    
    return jsonify({
        "success": True,
        "recommendations": recommendations[:5]  # Top 5 recommendations
    })

@app.route("/api/motivation")
def motivation(): 
    motivational_quotes = [
        "Education unlocks your future! 🌟",
        "If others can, you can too! 💪",
        "Stay motivated—graduation opens doors. 🚪",
        "Your dreams are valid, work for them! ✨",
        "Every expert was once a beginner. 📚",
        "Success is the sum of small efforts repeated. 🏆",
        "The future belongs to those who prepare today. 🌅"
    ]
    return jsonify(motivational_quotes)

@app.route("/api/timeline")
def timeline(): 
    timeline_data = [
        {"event": "Admission Start", "date": "2025-09-20", "status": "upcoming"},
        {"event": "Scholarship Deadline", "date": "2025-09-30", "status": "urgent"},
        {"event": "Entrance Exam Registration", "date": "2025-10-15", "status": "upcoming"},
        {"event": "Career Counseling Week", "date": "2025-10-25", "status": "upcoming"},
        {"event": "Internship Applications Open", "date": "2025-11-01", "status": "upcoming"}
    ]
    return jsonify(timeline_data)

@app.route("/api/career-paths")
def career_paths():
    career_data = [
        {
            "id": 1,
            "title": "Software Engineering",
            "description": "Design and develop software applications",
            "requirements": ["12th with Maths", "Engineering Entrance"],
            "salary": "₹4-15 LPA",
            "colleges": ["NIT Srinagar", "University of Kashmir CS Dept"]
        },
        {
            "id": 2,
            "title": "Medical Doctor",
            "description": "Provide healthcare and medical treatment",
            "requirements": ["12th with PCB", "NEET Qualification"],
            "salary": "₹6-20 LPA",
            "colleges": ["GMC Jammu", "GMC Srinagar"]
        },
        {
            "id": 3,
            "title": "Business Management",
            "description": "Manage business operations and strategy",
            "requirements": ["12th Any Stream", "Management Entrance"],
            "salary": "₹3-12 LPA", 
            "colleges": ["University of Jammu", "Central University"]
        },
        {
            "id": 4,
            "title": "Teaching",
            "description": "Educate and inspire future generations",
            "requirements": ["Graduate + B.Ed", "Teaching Aptitude"],
            "salary": "₹2-8 LPA",
            "colleges": ["Education Colleges", "Universities"]
        }
    ]
    return jsonify(career_data)

if __name__ == "__main__": 
    app.run(debug=True, port=5000)