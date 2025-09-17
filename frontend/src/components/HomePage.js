import React from 'react';
import './HomePage.css';

const images = [
  { src: "/images/college1.jpg", alt: "Elite College 1" },
  { src: "/images/college2.jpg", alt: "Elite College 2" },
  { src: "/images/college3.jpg", alt: "Elite College 3" },
  { src: "/images/college4.jpg", alt: "Elite College 4" }
];

const HomePage = ({ user }) => {
  return (
    <div className="homepage-container">
      <header className="hero-section">
        <h1 className="hero-title">Your Future Starts Here</h1>
        <p className="hero-subtitle">Explore career paths, colleges, internships & more</p>
        {user ? (
          <p className="welcome-message">Welcome back, <strong>{user.fullName}</strong>!</p>
        ) : (
          <p className="welcome-message">Sign up or log in for personalized guidance.</p>
        )}
      </header>

      <section className="gallery">
        {images.map(({ src, alt }, index) => (
          <div
            key={index}
            className="gallery-item"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <img src={src} alt={alt} />
            <div className="caption">{alt}</div>
          </div>
        ))}
      </section>

      <section className="features-section">
        <h2>Why Choose Career Planner?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-lightbulb feature-icon"></i>
            <h3>Personalized Careers</h3>
            <p>Custom advice tailored to your skills and interests.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-university feature-icon"></i>
            <h3>Top Colleges</h3>
            <p>Discover colleges and their courses with detailed info.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clipboard-list feature-icon"></i>
            <h3>Interactive Quizzes</h3>
            <p>Engage with quizzes that help refine your interests.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-users feature-icon"></i>
            <h3>Mentor Support</h3>
            <p>Learn from mentors who guide your career journey.</p>
          </div>
        </div>
        <button className="btn-glow">Get Started</button>
      </section>
    </div>
  );
};

export default HomePage;
