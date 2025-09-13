
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    colleges: 0,
    internships: 0,
    scholarships: 0,
    mentors: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchStats = async () => {
      try {
        const [collegesRes, internshipsRes, scholarshipsRes, mentorsRes, motivationRes] = await Promise.all([
          fetch('http://localhost:5000/api/colleges'),
          fetch('http://localhost:5000/api/internships'),
          fetch('http://localhost:5000/api/scholarships'),
          fetch('http://localhost:5000/api/mentors'),
          fetch('http://localhost:5000/api/motivation')
        ]);

        const colleges = await collegesRes.json();
        const internships = await internshipsRes.json();
        const scholarships = await scholarshipsRes.json();
        const mentors = await mentorsRes.json();
        const motivation = await motivationRes.json();

        setStats({
          colleges: colleges.length,
          internships: internships.length,
          scholarships: scholarships.length,
          mentors: mentors.length
        });

        setMotivationalQuote(motivation[Math.floor(Math.random() * motivation.length)]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mt-4">
      {/* Welcome Section */}
      <div className="hero-section bg-primary text-white rounded-3 p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold">Welcome back, {user.username}! 🎓</h1>
            <p className="lead mb-0">Ready to explore your career opportunities today?</p>
          </div>
          <div className="col-md-4 text-center">
            <div className="bg-white bg-opacity-20 rounded-3 p-3">
              <h6 className="mb-2">Daily Motivation</h6>
              <p className="mb-0 small">{motivationalQuote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="text-primary mb-2">
                <i className="fas fa-university fa-2x"></i>
              </div>
              <h3 className="card-title text-primary mb-1">{stats.colleges}</h3>
              <p className="card-text small text-muted">Colleges Available</p>
              <Link to="/colleges" className="btn btn-outline-primary btn-sm">
                Explore
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="text-success mb-2">
                <i className="fas fa-briefcase fa-2x"></i>
              </div>
              <h3 className="card-title text-success mb-1">{stats.internships}</h3>
              <p className="card-text small text-muted">Internships</p>
              <Link to="/internships" className="btn btn-outline-success btn-sm">
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="text-warning mb-2">
                <i className="fas fa-graduation-cap fa-2x"></i>
              </div>
              <h3 className="card-title text-warning mb-1">{stats.scholarships}</h3>
              <p className="card-text small text-muted">Scholarships</p>
              <Link to="/scholarships" className="btn btn-outline-warning btn-sm">
                View All
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-3">
          <div className="card text-center h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="text-info mb-2">
                <i className="fas fa-chalkboard-teacher fa-2x"></i>
              </div>
              <h3 className="card-title text-info mb-1">{stats.mentors}</h3>
              <p className="card-text small text-muted">Expert Mentors</p>
              <Link to="/mentors" className="btn btn-outline-info btn-sm">
                Connect
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">
                <i className="fas fa-rocket me-2"></i>Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Link to="/quiz" className="btn btn-primary btn-lg w-100 d-flex align-items-center">
                    <i className="fas fa-question-circle me-3 fa-2x"></i>
                    <div className="text-start">
                      <div className="fw-bold">Take Career Quiz</div>
                      <small className="opacity-75">Discover your ideal career path</small>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 mb-3">
                  <Link to="/career-paths" className="btn btn-success btn-lg w-100 d-flex align-items-center">
                    <i className="fas fa-road me-3 fa-2x"></i>
                    <div className="text-start">
                      <div className="fw-bold">Explore Careers</div>
                      <small className="opacity-75">Browse career opportunities</small>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Link to="/chatbot" className="btn btn-info btn-lg w-100 d-flex align-items-center">
                    <i className="fas fa-robot me-3 fa-2x"></i>
                    <div className="text-start">
                      <div className="fw-bold">AI Assistant</div>
                      <small className="opacity-75">Get instant career guidance</small>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 mb-3">
                  <Link to="/mentor-signup" className="btn btn-warning btn-lg w-100 d-flex align-items-center">
                    <i className="fas fa-user-plus me-3 fa-2x"></i>
                    <div className="text-start">
                      <div className="fw-bold">Become Mentor</div>
                      <small className="opacity-75">Help other students</small>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">
                <i className="fas fa-calendar-alt me-2"></i>Upcoming Deadlines
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-danger small">Scholarship Deadline</span>
                <span className="badge bg-danger">Sept 30</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-warning small">Admission Start</span>
                <span className="badge bg-warning">Sept 20</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-info small">Entrance Exam</span>
                <span className="badge bg-info">Oct 15</span>
              </div>
              <Link to="/timeline" className="btn btn-outline-primary btn-sm w-100 mt-3">
                View Full Timeline
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">
                <i className="fas fa-star me-2"></i>Featured for You
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="fas fa-map-marker-alt text-primary fa-3x mb-3"></i>
                    <h6>Colleges Near You</h6>
                    <p className="text-muted small">Discover quality institutions in Jammu & Kashmir</p>
                    <Link to="/colleges" className="btn btn-outline-primary">Explore</Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="fas fa-hand-holding-usd text-success fa-3x mb-3"></i>
                    <h6>Financial Aid</h6>
                    <p className="text-muted small">Find scholarships and funding opportunities</p>
                    <Link to="/scholarships" className="btn btn-outline-success">Apply</Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="fas fa-users text-info fa-3x mb-3"></i>
                    <h6>Expert Guidance</h6>
                    <p className="text-muted small">Connect with experienced mentors</p>
                    <Link to="/mentors" className="btn btn-outline-info">Connect</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;