import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ user }) => (
  <div className="hero bg-gradient-primary text-white text-center py-5">
    <div className="container">
      <h1 className="display-4 fw-bold text-gradient">Transform Your Career Journey</h1>
      <p className="lead mb-4">Personalized career paths, top colleges, internships, scholarships, and mentors.</p>
      <div className="d-flex justify-content-center gap-3">
        <Link to={user ? "/quiz" : "/signup"} className="btn btn-success btn-lg pulse"> {user ? "Take Quiz" : "Get Started Now"} </Link>
        <Link to="/dashboard" className="btn btn-info btn-lg pulse">Dashboard</Link>
      </div>
    </div>
  </div>
);

export default HomePage;
