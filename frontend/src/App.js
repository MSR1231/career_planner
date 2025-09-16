import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Import components
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import CareerPaths from './components/CareerPaths';
import Mentors from './components/Mentors';
import MentorSignup from './components/MentorSignup';
import Chatbot from './components/Chatbot';
import CollegeList from './components/CollegeList';
import InternshipList from './components/InternshipList';
import ScholarshipList from './components/ScholarshipList';
import StudyMaterials from './components/StudyMaterials';
import ExamGuides from './components/ExamGuides';

// Import data JSONs
import colleges from './data/colleges.json';
import internships from './data/internships.json';
import scholarships from './data/scholarships.json';
import mentors from './data/mentors.json';
import studyMaterials from './data/study_materials.json';
import examGuides from './data/exam_guides.json';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [userInterests, setUserInterests] = useState(JSON.parse(localStorage.getItem('userInterests')) || {});
  const [userLocation, setUserLocation] = useState(localStorage.getItem('userLocation') || '');

  // Sync localStorage with state
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
  }, [userInterests]);
  useEffect(() => {
    localStorage.setItem('userLocation', userLocation);
  }, [userLocation]);

  const logout = () => {
    setUser(null);
    setUserInterests({});
    setUserLocation('');
    localStorage.clear();
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Career Planner</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto gap-3">
              {user ? (
                <>
                  <li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                  <li className="nav-item"><Link to="/quiz" className="nav-link">Quiz</Link></li>
                  <li className="nav-item"><Link to="/colleges" className="nav-link">Colleges</Link></li>
                  <li className="nav-item"><Link to="/internships" className="nav-link">Internships</Link></li>
                  <li className="nav-item"><Link to="/scholarships" className="nav-link">Scholarships</Link></li>
                  <li className="nav-item"><Link to="/career-paths" className="nav-link">Career Paths</Link></li>
                  <li className="nav-item"><Link to="/mentors" className="nav-link">Mentors</Link></li>
                  <li className="nav-item"><Link to="/study-materials" className="nav-link">Study Materials</Link></li>
                  <li className="nav-item"><Link to="/exam-guides" className="nav-link">Exam Guides</Link></li>
                  <li className="nav-item">
                    <button className="btn btn-warning btn-sm" onClick={logout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                  <li className="nav-item"><Link to="/signup" className="nav-link">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup onSignup={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} userInterests={userInterests} userLocation={userLocation} /> : <Navigate to="/login" />} />
        <Route path="/quiz" element={user ? <Quiz setUserInterests={setUserInterests} setUserLocation={setUserLocation} /> : <Navigate to="/login" />} />
        <Route path="/colleges" element={user ? <CollegeList colleges={colleges} userInterests={userInterests} userLocation={userLocation} /> : <Navigate to="/login" />} />
        <Route path="/internships" element={user ? <InternshipList internships={internships} /> : <Navigate to="/login" />} />
        <Route path="/scholarships" element={user ? <ScholarshipList scholarships={scholarships} /> : <Navigate to="/login" />} />
        <Route path="/career-paths" element={user ? <CareerPaths userInterests={userInterests} /> : <Navigate to="/login" />} />
        <Route path="/mentors" element={user ? <Mentors mentors={mentors} /> : <Navigate to="/login" />} />
        <Route path="/mentor-signup" element={user ? <MentorSignup /> : <Navigate to="/login" />} />
        <Route path="/study-materials" element={user ? <StudyMaterials materials={studyMaterials} /> : <Navigate to="/login" />} />
        <Route path="/exam-guides" element={user ? <ExamGuides examGuides={examGuides} /> : <Navigate to="/login" />} />
        <Route path="*" element={<div className="container my-5"><h1>404 - Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
