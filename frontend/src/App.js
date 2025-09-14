import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Import all your existing JSON data
import collegesData from './data/colleges.json';
import internshipsData from './data/internships.json';
import scholarshipsData from './data/scholarships.json';
import quizData from './data/intermediate.json';

// Import all your existing components
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

// Import NEW ENHANCED components (copy-paste these files to your components folder)
import VoiceChatbot from './components/VoiceChatbot';
import StudyMaterials from './components/StudyMaterials';
import ExamGuides from './components/ExamGuides';

function App() {
  // Your existing state
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [userInterests, setUserInterests] = useState(JSON.parse(localStorage.getItem('userInterests')) || {});
  const [userLocation, setUserLocation] = useState(localStorage.getItem('userLocation') || '');

  // NEW: Enhanced state for new features
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // Your existing effects
  useEffect(() => {
    localStorage.setItem('userInterests', JSON.stringify(userInterests));
  }, [userInterests]);

  useEffect(() => {
    localStorage.setItem('userLocation', userLocation);
  }, [userLocation]);

  // Your existing handlers with ENHANCEMENTS
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
    setShowVoiceChat(false); // Close voice chat on logout
  };

  return (
    <Router>
      <div className="App">
        {/* ENHANCED NAVIGATION with new components */}
        {user && (
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
              <Link className="navbar-brand" to="/dashboard">
                🎓 Career Planner
              </Link>
              <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">🏠 Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/career-paths">🎯 Career Paths</Link>
                  </li>
                  {/* NEW ENHANCED NAVIGATION ITEMS */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/study-materials">📚 Study Materials</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/exam-guides">📝 Exam Guides</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/colleges">🏫 Colleges</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/scholarships">💰 Scholarships</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mentors">👨‍🏫 Mentors</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/quiz">🧠 Quiz</Link>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      👋 {user.fullName || user.username}
                    </a>
                    <ul className="dropdown-menu">
                      <li><span className="dropdown-item-text">Class: {user.currentClass || '12'}</span></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}

        {/* ROUTES - Your existing + NEW ENHANCED routes */}
        <Routes>
          <Route 
            path="/" 
            element={!user ? <HomePage /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/dashboard" />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/quiz" 
            element={user ? <Quiz user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/career-paths" 
            element={user ? <CareerPaths user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/mentors" 
            element={user ? <Mentors user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/mentor-signup" 
            element={user ? <MentorSignup /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/colleges" 
            element={user ? <CollegeList user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/internships" 
            element={user ? <InternshipList user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/scholarships" 
            element={user ? <ScholarshipList user={user} /> : <Navigate to="/login" />} 
          />

          {/* NEW ENHANCED ROUTES */}
          <Route 
            path="/study-materials" 
            element={user ? <StudyMaterials user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/exam-guides" 
            element={user ? <ExamGuides user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>

        {/* FLOATING VOICE CHAT BUTTON - Always visible when logged in */}
        {user && (
          <button 
            className="voice-chat-trigger"
            onClick={() => setShowVoiceChat(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
              zIndex: 999,
              animation: 'pulse 2s infinite',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            title="Ask AI Mentor anything about your career!"
          >
            🎤 AI Mentor
          </button>
        )}

        {/* VOICE CHATBOT COMPONENT - Modal overlay */}
        <VoiceChatbot 
          user={user}
          isOpen={showVoiceChat}
          onClose={() => setShowVoiceChat(false)}
        />

        {/* Your existing chatbot (keeping for compatibility) */}
        {user && (
          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 998 }}>
            <Chatbot />
          </div>
        )}

        {/* Add pulse animation for voice button */}
        <style jsx>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .voice-chat-trigger:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4) !important;
            transition: all 0.3s ease !important;
          }

          /* Mobile responsive voice button */
          @media (max-width: 768px) {
            .voice-chat-trigger {
              bottom: 10px !important;
              right: 10px !important;
              padding: 12px 16px !important;
              font-size: 0.9rem !important;
            }
          }

          /* Enhanced navbar styling */
          .navbar-nav .nav-link {
            border-radius: 8px;
            margin: 0 4px;
            transition: all 0.3s ease;
          }

          .navbar-nav .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
          }

          /* User dropdown styling */
          .dropdown-menu {
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border: none;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;