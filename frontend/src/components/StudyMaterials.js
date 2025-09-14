import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, Filter, Book, FileText, Video, ExternalLink, Star, Clock, Users } from 'lucide-react';
import './StudyMaterials.css';

const StudyMaterials = ({ user }) => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Official Textbooks', label: 'NCERT Books' },
    { value: 'Science Textbooks', label: 'Science Books' },
    { value: 'Career Guidance', label: 'Career Guidance' },
    { value: 'Entrance Exam Preparation', label: 'Entrance Exams' },
    { value: 'Study Materials', label: 'Study Notes' },
    { value: 'Government Resources', label: 'Government Resources' }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Social Science', label: 'Social Science' },
    { value: 'Commerce', label: 'Commerce' },
    { value: 'Career Guidance', label: 'Career Guidance' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'textbook', label: 'Textbooks' },
    { value: 'guide', label: 'Guides' },
    { value: 'preparation_material', label: 'Exam Prep' },
    { value: 'study_notes', label: 'Study Notes' },
    { value: 'multimedia', label: 'Videos & Audio' }
  ];

  useEffect(() => {
    fetchStudyMaterials();
  }, [user]);

  useEffect(() => {
    filterMaterials();
  }, [materials, searchTerm, selectedCategory, selectedSubject, selectedType]);

  const fetchStudyMaterials = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/study-materials?user_class=${user?.currentClass || '10'}`);
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error('Error fetching study materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMaterials = () => {
    let filtered = materials;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(material => material.category === selectedCategory);
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(material =>
        material.subjects.includes(selectedSubject)
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(material => material.type === selectedType);
    }

    setFilteredMaterials(filtered);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'textbook': return <Book size={20} />;
      case 'guide': return <FileText size={20} />;
      case 'multimedia': return <Video size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'textbook': return '#3b82f6';
      case 'guide': return '#10b981';
      case 'preparation_material': return '#f59e0b';
      case 'study_notes': return '#8b5cf6';
      case 'multimedia': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatFileSize = (size) => {
    if (!size) return '';
    if (size.includes('MB')) return size;
    if (size.includes('GB')) return size;
    return `${size} MB`;
  };

  const handleDownload = (material) => {
    if (material.download_link && material.download_link !== '#') {
      window.open(material.download_link, '_blank');
    } else {
      alert('Download link will be available soon!');
    }
  };

  const handlePreview = (material) => {
    if (material.preview_link && material.preview_link !== '#') {
      window.open(material.preview_link, '_blank');
    } else {
      alert('Preview link will be available soon!');
    }
  };

  if (loading) {
    return (
      <div className="study-materials-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading study materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="study-materials-container">
      <div className="materials-header">
        <div className="header-content">
          <h2>📚 Free Study Materials & Resources</h2>
          <p>Access high-quality educational content tailored for Class {user?.currentClass || '10'} students</p>
        </div>
        
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{materials.length}</span>
            <span className="stat-label">Total Resources</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {materials.filter(m => m.free).length}
            </span>
            <span className="stat-label">Free Resources</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {new Set(materials.flatMap(m => m.subjects)).size}
            </span>
            <span className="stat-label">Subjects Covered</span>
          </div>
        </div>
      </div>

      <div className="search-filters-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for study materials, subjects, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
          >
            {subjects.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            {types.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="no-results">
          <Book size={48} />
          <h3>No materials found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="materials-grid">
          {filteredMaterials.map(material => (
            <div key={material.id} className="material-card">
              <div className="card-header">
                <div className="type-badge" style={{ backgroundColor: getTypeColor(material.type) }}>
                  {getTypeIcon(material.type)}
                  <span>{material.type.replace('_', ' ')}</span>
                </div>
                {material.free && <span className="free-badge">FREE</span>}
              </div>

              <div className="card-content">
                <h3 className="material-title">{material.title}</h3>
                <p className="material-description">{material.description}</p>

                <div className="subjects-row">
                  {material.subjects.slice(0, 3).map((subject, index) => (
                    <span key={index} className="subject-tag">{subject}</span>
                  ))}
                  {material.subjects.length > 3 && (
                    <span className="subject-tag more">+{material.subjects.length - 3} more</span>
                  )}
                </div>

                <div className="material-meta">
                  <div className="meta-item">
                    <Users size={16} />
                    <span>{material.downloads?.toLocaleString()} downloads</span>
                  </div>
                  <div className="meta-item">
                    <Star size={16} />
                    <span>{material.rating}/5</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{formatFileSize(material.size)}</span>
                  </div>
                </div>

                <div className="publisher-info">
                  <span>Published by {material.publisher}</span>
                  <span className="update-date">Updated: {new Date(material.last_updated).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => handleDownload(material)}
                >
                  <Download size={18} />
                  Download
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => handlePreview(material)}
                >
                  <Eye size={18} />
                  Preview
                </button>
                {material.download_link && material.download_link.startsWith('http') && (
                  <button 
                    className="action-btn link"
                    onClick={() => window.open(material.download_link, '_blank')}
                  >
                    <ExternalLink size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="materials-footer">
        <div className="footer-content">
          <h3>💡 Need More Resources?</h3>
          <p>Can't find what you're looking for? Our AI mentor can help you discover additional study materials and resources!</p>
          <div className="footer-links">
            <span>📖 All materials are verified for quality and accuracy</span>
            <span>🆓 Most resources are completely free to download</span>
            <span>📱 Compatible with all devices and platforms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;