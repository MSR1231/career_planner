import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, userInterests, userLocation }) => {
  const summaries = {
    1: { Science: "Science & Technology", Arts: "Arts & Humanities", Commerce: "Commerce & Finance", Vocational: "Vocational & Practical" },
    2: { Yes: "You enjoy working with data", No: "More creative pursuits" },
    3: { Practical: "Hands-on learning", Theoretical: "Research focused" },
    4: { Yes: "Interested in Computer Science and IT", No: "Non-tech fields" },
    5: { Yes: "You enjoy helping and solving problems", No: "Individual tasks preference" }
  };

  const getInterestSummary = () => {
    if(!userInterests || Object.keys(userInterests).length === 0) {
      return "You have not taken the career quiz yet. Start it now!";
    }
    let texts = [];
    Object.entries(userInterests).forEach(([key, val]) => {
      if(summaries[key] && summaries[key][val]) texts.push(summaries[key][val]);
    });
    return 'Based on your quiz, your interests align with: ' + texts.join(', ') + '.';
  };

  return (
    <div className="container py-5">
      <h2>Welcome back, {user?.fullName || user?.email}!</h2>
      <p><strong>Location:</strong> {userLocation || 'Not specified'}</p>
      <p><strong>Class & Age:</strong> {user?.currentClass || 'N/A'}, {user?.age || 'N/A'} years</p>
      <div className="alert alert-info">
        {getInterestSummary()}
      </div>

      <div className="row mt-4 gap-3">
        <Link to="/quiz" className="btn btn-success col-md-3">Retake Career Quiz</Link>
        <Link to="/colleges" className="btn btn-primary col-md-3">Browse Colleges</Link>
        <Link to="/internships" className="btn btn-warning col-md-3">Find Internships</Link>
        <Link to="/scholarships" className="btn btn-info col-md-3">Explore Scholarships</Link>
        <Link to="/mentors" className="btn btn-secondary col-md-3">Connect with Mentors</Link>
        <Link to="/study-materials" className="btn btn-dark col-md-3">Access Study Materials</Link>
        <Link to="/career-paths" className="btn btn-outline-primary col-md-3">View Career Paths</Link>
        <Link to="/exam-guides" className="btn btn-outline-success col-md-3">Check Exam Guides</Link>
      </div>
    </div>
  );
};

export default Dashboard;
