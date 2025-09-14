import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, userInterests, userLocation }) => {
  // Safety checks to handle both old and new user data structures
  const safeUserInterests = userInterests || user?.interests || {};
  const safeUserLocation = userLocation || user?.location || 'Not specified';
  const safeUser = user || {};

  const getInterestSummary = () => {
    // Safe check - ensure userInterests exists and is an object
    if (!safeUserInterests || typeof safeUserInterests !== 'object' || Object.keys(safeUserInterests).length === 0) {
      return "You haven't taken the career quiz yet. Click below to get started!";
    }

    const summaries = {
      1: {
        "Science": "Science and Technology",
        "Arts": "Humanities and Arts",
        "Commerce": "Commerce and Finance",
        "Vocational": "Vocational and Practical Skills"
      },
      2: {
        "Yes": "Data Analysis",
        "No": "Creative fields"
      },
      3: {
        "Practical": "Hands-on projects and labs",
        "Theoretical": "Research and study-based fields"
      },
      4: {
        "Yes": "Computer Science and IT",
        "No": "Non-tech fields"
      },
      5: {
        "Yes": "Healthcare and Social Work",
        "No": "Individual-focused tasks"
      }
    };

    let summaryText = "Based on your quiz results, you seem to have a strong interest in ";
    const interestPoints = [];

    if (safeUserInterests[1] && summaries[1][safeUserInterests[1]]) {
      interestPoints.push(summaries[1][safeUserInterests[1]]);
    }
    if (safeUserInterests[2] === "Yes" && summaries[2][safeUserInterests[2]]) {
      interestPoints.push(summaries[2][safeUserInterests[2]]);
    }
    if (safeUserInterests[3] === "Practical" && summaries[3][safeUserInterests[3]]) {
      interestPoints.push(summaries[3][safeUserInterests[3]]);
    }
    if (safeUserInterests[4] === "Yes" && summaries[4][safeUserInterests[4]]) {
      interestPoints.push(summaries[4][safeUserInterests[4]]);
    }
    if (safeUserInterests[5] === "Yes" && summaries[5][safeUserInterests[5]]) {
      interestPoints.push(summaries[5][safeUserInterests[5]]);
    }

    if (interestPoints.length > 0) {
      return summaryText + interestPoints.join(', ') + ". This will help us suggest the best options for you!";
    } else {
      return "We are building your personalized profile. Take the quiz to get the best recommendations!";
    }
  };

  return (
    <div className="container mt-5 pt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-4">
            <h2>Welcome, {safeUser.fullName || safeUser.username || 'Student'}!</h2>
            <p className="lead text-muted">Your Personalized Career Hub</p>
            {safeUser.currentClass && (
              <div className="badge bg-primary fs-6 mb-2">
                Class {safeUser.currentClass}
              </div>
            )}
          </div>
          
          <div className="card shadow-lg p-5 mb-4 border-0">
            <h4 className="card-title">My Career Profile</h4>
            <hr />
            <p className="card-text">
              <i className="bi bi-geo-alt-fill me-2"></i>
              <strong>Location:</strong> {safeUserLocation}
            </p>
            <p className="card-text">
              <i className="bi bi-lightbulb-fill me-2"></i>
              <strong>Interests:</strong> {getInterestSummary()}
            </p>
            {safeUser.age && (
              <p className="card-text">
                <i className="bi bi-person-fill me-2"></i>
                <strong>Age:</strong> {safeUser.age} years
              </p>
            )}
            <div className="d-grid gap-2 d-md-flex mt-4">
              <Link to="/quiz" className="btn btn-primary btn-lg">
                <i className="bi bi-pencil-square me-2"></i> Take Career Quiz
              </Link>
              <Link to="/colleges" className="btn btn-outline-primary btn-lg">
                <i className="bi bi-mortarboard-fill me-2"></i> View Colleges
              </Link>
            </div>
          </div>

          <div className="row g-4 text-center mt-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-book-fill icon-large text-primary mb-3"></i>
                <h5>📚 Study Materials</h5>
                <p className="text-muted">Access free NCERT books and educational resources.</p>
                <Link to="/study-materials" className="btn btn-sm btn-outline-secondary mt-auto">Browse Materials</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-clipboard-check-fill icon-large text-success mb-3"></i>
                <h5>📝 Exam Guides</h5>
                <p className="text-muted">Comprehensive information about entrance exams.</p>
                <Link to="/exam-guides" className="btn btn-sm btn-outline-secondary mt-auto">View Exams</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-chat-dots-fill icon-large text-info mb-3"></i>
                <h5>🎤 AI Mentor</h5>
                <p className="text-muted">Voice-powered career guidance and mentorship.</p>
                <button 
                  className="btn btn-sm btn-outline-secondary mt-auto"
                  onClick={() => {
                    // Trigger voice chat - this will be handled by the floating button
                    const voiceButton = document.querySelector('.voice-chat-trigger');
                    if (voiceButton) voiceButton.click();
                  }}
                >
                  Start Voice Chat
                </button>
              </div>
            </div>
          </div>

          <div className="row g-4 text-center mt-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-journal-check icon-large text-warning mb-3"></i>
                <h5>💼 Internships</h5>
                <p className="text-muted">Explore internships matching your interests and location.</p>
                <Link to="/internships" className="btn btn-sm btn-outline-secondary mt-auto">Find Internships</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-cash-stack icon-large text-success mb-3"></i>
                <h5>💰 Scholarships</h5>
                <p className="text-muted">Find financial aid options based on your profile.</p>
                <Link to="/scholarships" className="btn btn-sm btn-outline-secondary mt-auto">View Scholarships</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-people-fill icon-large text-info mb-3"></i>
                <h5>👨‍🏫 Mentors</h5>
                <p className="text-muted">Connect with experienced mentors in your field.</p>
                <Link to="/mentors" className="btn btn-sm btn-outline-secondary mt-auto">Find Mentors</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
