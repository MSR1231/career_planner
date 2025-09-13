import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CollegeList({ colleges, userInterests, userLocation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(userLocation || '');
  const [selectedType, setSelectedType] = useState('');

  const matchesInterests = (college) => {
    const interestAnswers = userInterests;
    const subjectInterest = interestAnswers[1];
    
    if (!subjectInterest) {
      return true;
    }

    const typeMapping = {
      "Science": ["University", "Science College", "Engineering College", "Medical College", "Agricultural University"],
      "Commerce": ["University", "General College", "Commerce & Science College", "Management College"],
      "Arts": ["University", "General College", "Arts College"],
      "Vocational": ["Polytechnic"]
    };

    const relevantTypes = typeMapping[subjectInterest] || [];
    return relevantTypes.includes(college.type);
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === '' || college.location.toLowerCase() === selectedLocation.toLowerCase();
    const matchesType = selectedType === '' || college.type.toLowerCase() === selectedType.toLowerCase();
    const matchesPersonalization = matchesInterests(college);

    return matchesSearch && matchesLocation && matchesType && matchesPersonalization;
  });

  const getRecommendationsHeading = () => {
    if (Object.keys(userInterests).length > 0) {
      return `Recommended Colleges for You`;
    }
    return "All Colleges in Jammu & Kashmir";
  };

  const allLocations = [...new Set(colleges.map(c => c.location))];
  const allTypes = [...new Set(colleges.map(c => c.type))];

  return (
    <div className="container mt-5 pt-5 pb-5">
      <div className="text-center mb-5">
        <h2>{getRecommendationsHeading()}</h2>
        <p className="lead text-muted">
          {Object.keys(userInterests).length > 0
            ? "Based on your career quiz results and location."
            : "Take the career quiz to get personalized college recommendations."}
        </p>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <select 
            className="form-select" 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {allLocations.sort().map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <select 
            className="form-select" 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {allTypes.sort().map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredColleges.length > 0 ? (
          filteredColleges.map(college => (
            <div key={college.id} className="col-lg-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{college.name}</h5>
                  <p className="card-text text-muted">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    {college.location}
                  </p>
                  <p className="card-text">
                    <strong>Type:</strong> {college.type}
                    <br />
                    <strong>Affiliation:</strong> {college.affiliation}
                    <br />
                    <strong>Fees:</strong> {college.fees}
                    <br />
                    <strong>Cutoff:</strong> {college.cutoff}
                  </p>
                  <Link to={college.website} className="btn btn-sm btn-outline-primary mt-2" target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <p className="lead text-muted">No colleges found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollegeList;