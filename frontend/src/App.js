import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Quiz from './components/Quiz';
import CareerPaths from './components/CareerPaths';
import Mentors from './components/Mentors';
import Chatbot from './components/Chatbot';

function Home() {
  return (
    <div style={{padding:20}}>
      <h2>Welcome to Career Planner</h2>
      <p>Select an option from navigation.</p>
    </div>
  );
}

function NavBar() {
  return (
    <nav style={{marginBottom: 20, background:'#eee', padding:10}}>
      <Link style={{marginRight:12}} to="/">Home</Link>
      <Link style={{marginRight:12}} to="/login">Login</Link>
      <Link style={{marginRight:12}} to="/signup">Signup</Link>
      <Link style={{marginRight:12}} to="/quiz">Quiz</Link>
      <Link style={{marginRight:12}} to="/career-paths">Career Paths</Link>
      <Link style={{marginRight:12}} to="/mentors">Mentors</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/career-paths" element={<CareerPaths />} />
        <Route path="/mentors" element={<Mentors />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
