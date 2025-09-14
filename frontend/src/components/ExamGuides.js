import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, DollarSign, BookOpen, Target, ExternalLink, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import './ExamGuides.css';

const ExamGuides = ({ user }) => {
  const [examGuides, setExamGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set());

  const streams = [
    { value: 'all', label: 'All Streams' },
    { value: 'science', label: 'Science' },
    { value: 'pcm', label: 'PCM' },
    { value: 'pcb', label: 'PCB' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'High', label: 'High' },
    { value: 'Very High', label: 'Very High' },
    { value: 'Extremely High', label: 'Extremely High' }
  ];

  useEffect(() => {
    fetchExamGuides();
  }, [user]);

  useEffect(() => {
    filterGuides();
  }, [examGuides, searchTerm, selectedStream, selectedDifficulty]);

  const fetchExamGuides = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/exam-guides?user_class=${user?.currentClass || '12'}&stream=${user?.stream || 'all'}`);
      const data = await response.json();
      setExamGuides(data);
    } catch (error) {
      console.error('Error fetching exam guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterGuides = () => {
    let filtered = examGuides;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(guide =>
        guide.exam_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.full_form.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by stream
    if (selectedStream !== 'all') {
      filtered = filtered.filter(guide =>
        guide.streams && guide.streams.includes(selectedStream)
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(guide =>
        guide.difficulty_level && guide.difficulty_level.includes(selectedDifficulty)
      );
    }

    setFilteredGuides(filtered);
  };

  const toggleCardExpansion = (examId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(examId)) {
      newExpanded.delete(examId);
    } else {
      newExpanded.add(examId);
    }
    setExpandedCards(newExpanded);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Moderate': return '#10b981';
      case 'High': return '#f59e0b';
      case 'Very High': return '#ef4444';
      case 'Extremely High': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="exam-guides-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading exam guides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-guides-container">
      <div className="guides-header">
        <div className="header-content">
          <h2>🎯 Entrance Exam Guides</h2>
          <p>Comprehensive information about entrance exams for Class {user?.currentClass || '12'} students</p>
        </div>

        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-number">{examGuides.length}</span>
            <span className="stat-label">Total Exams</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {examGuides.filter(g => g.applicable_classes?.includes(user?.currentClass || '12')).length}
            </span>
            <span className="stat-label">Relevant for You</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {new Set(examGuides.flatMap(g => g.streams || [])).size}
            </span>
            <span className="stat-label">Streams Covered</span>
          </div>
        </div>
      </div>

      <div className="search-filters-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for entrance exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="filter-select"
          >
            {streams.map(stream => (
              <option key={stream.value} value={stream.value}>
                {stream.label}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredGuides.length === 0 ? (
        <div className="no-results">
          <Target size={48} />
          <h3>No exam guides found</h3>
          <p>Try adjusting your search or filters to find relevant exams.</p>
        </div>
      ) : (
        <div className="guides-grid">
          {filteredGuides.map(guide => (
            <div key={guide.id} className="exam-guide-card">
              <div className="card-header">
                <div className="exam-title-section">
                  <h3 className="exam-name">{guide.exam_name}</h3>
                  <p className="exam-full-form">{guide.full_form}</p>
                </div>
                <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(guide.difficulty_level) }}>
                  {guide.difficulty_level}
                </div>
              </div>

              <div className="card-content">
                <p className="exam-description">{guide.description}</p>

                <div className="quick-info-grid">
                  <div className="info-item">
                    <Calendar size={16} />
                    <div>
                      <span className="info-label">Application</span>
                      <span className="info-value">
                        {formatDate(guide.exam_dates?.application_end)}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Clock size={16} />
                    <div>
                      <span className="info-label">Exam Date</span>
                      <span className="info-value">
                        {guide.exam_dates?.exam_dates || 'TBA'}
                      </span>
                    </div>
                  </div>

                  <div className="info-item">
                    <Users size={16} />
                    <div>
                      <span className="info-label">Competition</span>
                      <span className="info-value">{guide.competition_level}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <DollarSign size={16} />
                    <div>
                      <span className="info-label">Application Fee</span>
                      <span className="info-value">₹{guide.application_fee}</span>
                    </div>
                  </div>
                </div>

                <div className="streams-row">
                  {guide.streams && guide.streams.map((stream, index) => (
                    <span key={index} className="stream-tag">{stream.toUpperCase()}</span>
                  ))}
                </div>

                <button 
                  className="expand-btn"
                  onClick={() => toggleCardExpansion(guide.id)}
                >
                  {expandedCards.has(guide.id) ? 'Show Less' : 'Show More Details'}
                  {expandedCards.has(guide.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expandedCards.has(guide.id) && (
                  <div className="expanded-content">
                    <div className="detail-section">
                      <h4>📋 Eligibility Criteria</h4>
                      <ul>
                        <li><strong>Age Limit:</strong> {guide.eligibility?.age_limit}</li>
                        <li><strong>Qualification:</strong> {guide.eligibility?.qualification}</li>
                        {guide.eligibility?.minimum_percentage && (
                          <li><strong>Minimum Marks:</strong> {guide.eligibility.minimum_percentage}</li>
                        )}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h4>📝 Exam Pattern</h4>
                      <ul>
                        <li><strong>Mode:</strong> {guide.exam_pattern?.mode}</li>
                        <li><strong>Duration:</strong> {guide.exam_pattern?.duration}</li>
                        <li><strong>Subjects:</strong> {guide.exam_pattern?.subjects?.join(', ')}</li>
                        {guide.exam_pattern?.total_questions && (
                          <li><strong>Questions:</strong> {guide.exam_pattern.total_questions}</li>
                        )}
                        {guide.exam_pattern?.marking_scheme && (
                          <li><strong>Marking:</strong> {guide.exam_pattern.marking_scheme}</li>
                        )}
                      </ul>
                    </div>

                    {guide.preparation_tips && (
                      <div className="detail-section">
                        <h4>💡 Preparation Tips</h4>
                        <ul>
                          {guide.preparation_tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.career_prospects && (
                      <div className="detail-section">
                        <h4>🚀 Career Prospects</h4>
                        <ul>
                          {guide.career_prospects.map((prospect, index) => (
                            <li key={index}>{prospect}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.exam_dates && (
                      <div className="detail-section">
                        <h4>📅 Important Dates</h4>
                        <ul>
                          <li><strong>Application Start:</strong> {guide.exam_dates.application_start}</li>
                          <li><strong>Application End:</strong> {guide.exam_dates.application_end}</li>
                          <li><strong>Exam Date:</strong> {guide.exam_dates.exam_dates}</li>
                          <li><strong>Result Date:</strong> {guide.exam_dates.result_date}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="card-actions">
                  {guide.official_website && (
                    <a 
                      href={guide.official_website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-btn primary"
                    >
                      <ExternalLink size={16} />
                      Official Website
                    </a>
                  )}
                  <button className="action-btn secondary">
                    <BookOpen size={16} />
                    Study Materials
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="guides-footer">
        <div className="footer-content">
          <h3>🎓 Need Personalized Guidance?</h3>
          <p>Our AI mentor can help you choose the right exams based on your interests, strengths, and career goals!</p>
          <div className="footer-tips">
            <span>✨ All information is updated regularly</span>
            <span>📞 Get expert counseling for exam selection</span>
            <span>📚 Access preparation materials and mock tests</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamGuides;