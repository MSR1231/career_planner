
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, userInterests, userLocation }) => {
  const getInterestSummary = () => {
    if (Object.keys(userInterests).length === 0) {
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

    if (userInterests[1] && summaries[1][userInterests[1]]) {
      interestPoints.push(summaries[1][userInterests[1]]);
    }
    if (userInterests[2] === "Yes" && summaries[2][userInterests[2]]) {
      interestPoints.push(summaries[2][userInterests[2]]);
    }
    if (userInterests[3] === "Practical" && summaries[3][userInterests[3]]) {
      interestPoints.push(summaries[3][userInterests[3]]);
    }
    if (userInterests[4] === "Yes" && summaries[4][userInterests[4]]) {
      interestPoints.push(summaries[4][userInterests[4]]);
    }
    if (userInterests[5] === "Yes" && summaries[5][userInterests[5]]) {
      interestPoints.push(summaries[5][userInterests[5]]);
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
            <h2>Welcome, {user.username}!</h2>
            <p className="lead text-muted">Your Personalized Career Hub</p>
          </div>
          
          <div className="card shadow-lg p-5 mb-4 border-0">
            <h4 className="card-title">My Career Profile</h4>
            <hr />
            <p className="card-text">
              <i className="bi bi-geo-alt-fill me-2"></i>
              <strong>Location:</strong> {userLocation || 'Not specified'}
            </p>
            <p className="card-text">
              <i className="bi bi-lightbulb-fill me-2"></i>
              <strong>Interests:</strong> {getInterestSummary()}
            </p>
            <div className="d-grid gap-2 d-md-flex mt-4">
              <Link to="/quiz" className="btn btn-primary btn-lg">
                <i className="bi bi-pencil-square me-2"></i> Retake Career Quiz
              </Link>
              <Link to="/colleges" className="btn btn-outline-primary btn-lg">
                <i className="bi bi-mortarboard-fill me-2"></i> View Recommendations
              </Link>
            </div>
          </div>

          <div className="row g-4 text-center mt-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-journal-check icon-large text-primary mb-3"></i>
                <h5>Top Internships</h5>
                <p className="text-muted">Explore internships matching your interests and location.</p>
                <Link to="/internships" className="btn btn-sm btn-outline-secondary mt-auto">Go to Internships</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-cash-stack icon-large text-success mb-3"></i>
                <h5>Relevant Scholarships</h5>
                <p className="text-muted">Find financial aid options based on your profile.</p>
                <Link to="/scholarships" className="btn btn-sm btn-outline-secondary mt-auto">Go to Scholarships</Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 p-4 bg-light">
                <i className="bi bi-chat-dots-fill icon-large text-info mb-3"></i>
                <h5>Chat with AI Assistant</h5>
                <p className="text-muted">Get instant help and advice from our AI assistant.</p>
                <Link to="/chatbot" className="btn btn-sm btn-outline-secondary mt-auto">Start Chat</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;