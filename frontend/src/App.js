import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Mentors from "./components/Mentors";
import MentorSignup from "./components/MentorSignup";
import Chatbot from "./components/Chatbot";
import CollegeList from "./components/CollegeList";
import InternshipList from "./components/InternshipList";
import CareerPaths from "./components/CareerPaths";

import ScholarshipList from "./components/ScholarshipList";
import StudyMaterials from "./components/StudyMaterials";
import ExamGuides from "./components/ExamGuides";

import CareerFlowchartReact from "./components/CareerFlowchartReact";

import colleges from "./data/colleges.json";
import internships from "./data/internships.json";
import scholarships from "./data/scholarships.json";
import mentors from "./data/mentors.json";
import studyMaterials from "./data/study_materials.json";
import examGuides from "./data/exam_guides.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [userInterests, setUserInterests] = useState(
    JSON.parse(localStorage.getItem("userInterests")) || {}
  );
  const [userLocation, setUserLocation] = useState(localStorage.getItem("userLocation") || "");

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("userInterests", JSON.stringify(userInterests));
  }, [userInterests]);

  useEffect(() => {
    localStorage.setItem("userLocation", userLocation);
  }, [userLocation]);

  const logout = () => {
    setUser(null);
    setUserInterests({});
    setUserLocation("");
    localStorage.clear();
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Career Planner
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/career-flowchart" className="nav-link">
                  Career Flowcharts
                </Link>
              </li>

              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-warning btn-sm" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/career-flowchart" element={<CareerFlowchartReact />} />
        <Route
          path="/quiz"
          element={
            user ? (
              <Quiz setUserInterests={setUserInterests} setUserLocation={setUserLocation} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/colleges"
          element={<CollegeList colleges={colleges} userInterests={userInterests} userLocation={userLocation} />}
        />
        <Route path="/internships" element={<InternshipList internships={internships} />} />
        <Route path="/scholarships" element={<ScholarshipList scholarships={scholarships} />} />
        <Route path="/mentors" element={<Mentors mentors={mentors} />} />
        <Route path="/mentor-signup" element={<MentorSignup />} />
        <Route path="/study-materials" element={<StudyMaterials materials={studyMaterials} />} />
        <Route path="/career-paths" element={<CareerPaths />} />
        <Route path="/exam-guides" element={<ExamGuides examGuides={examGuides} />} />
        <Route
          path="/login"
          element={!user ? <Login onLogin={setUser} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup onSignup={setUser} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} userInterests={userInterests} userLocation={userLocation} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<div className="container my-5"><h1>404 - Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
