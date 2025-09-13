import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Import all your JSON data
import collegesData from './data/colleges.json';
import internshipsData from './data/internships.json';
import scholarshipsData from './data/scholarships.json';
import quizData from './data/intermediate.json';

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

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [userInterests, setUserInterests] = useState(JSON.parse(localStorage.getItem('userInterests')) || {});
  const [userLocation, setUserLocation] = useState(localStorage.getItem('userLocation') || '');

  // Effects to sync user data with localStorage
  useEffect(() => {
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
  }, [userInterests]);

  useEffect(() => {
    localStorage.setItem('userLocation', userLocation);
  }, [userLocation]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userInterests');
    localStorage.removeItem('userLocation');
    setUserInterests({});
    setUserLocation('');
  };

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <strong>Career Adviser</strong> 🎓
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                {user && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/quiz">Career Quiz</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/colleges">Colleges</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/career-paths">Career Paths</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/mentors">Mentors</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/internships">Internships</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/scholarships">Scholarships</Link>
                    </li>
                  </>
                )}
              </ul>
              <ul className="navbar-nav">
                {user ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">Welcome, {user.username}!</span>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} userInterests={userInterests} userLocation={userLocation} /> : <Navigate to="/login" />} />
            <Route path="/quiz" element={user ? <Quiz questions={quizData} setUserInterests={setUserInterests} userInterests={userInterests} /> : <Navigate to="/login" />} />
            <Route path="/career-paths" element={user ? <CareerPaths userInterests={userInterests} /> : <Navigate to="/login" />} />
            <Route path="/mentors" element={user ? <Mentors /> : <Navigate to="/login" />} />
            <Route path="/mentor-signup" element={user ? <MentorSignup /> : <Navigate to="/login" />} />
            <Route path="/colleges" element={user ? <CollegeList colleges={collegesData} userInterests={userInterests} userLocation={userLocation} /> : <Navigate to="/login" />} />
            <Route path="/internships" element={user ? <InternshipList internships={internshipsData} userInterests={userInterests} userLocation={userLocation} /> : <Navigate to="/login" />} />
            <Route path="/scholarships" element={user ? <ScholarshipList scholarships={scholarshipsData} userInterests={userInterests} /> : <Navigate to="/login" />} />
            <Route path="/chatbot" element={user ? <Chatbot /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        {user && (
          <div className="floating-chatbot">
            <Link 
              to="/chatbot" 
              className="btn btn-primary btn-floating"
              title="Chat with AI Assistant"
            >
              💬
            </Link>
          </div>
        )}
        <footer className="bg-light text-center py-4 mt-5">
          <div className="container">
            <p className="mb-0">
              <strong>Career Adviser</strong> - Empowering Students in Jammu & Kashmir
            </p>
            <small className="text-muted">
              Built for educational guidance and career development
            </small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;