import React, { useState } from 'react';

function InternshipList({ internships, userInterests, userLocation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(userLocation || '');
  const [minStipend, setMinStipend] = useState('');

  const matchesInterests = (internship) => {
    const interestAnswers = userInterests;
    const subjectInterest = interestAnswers[1];
    const techInterest = interestAnswers[4];
    const designInterest = interestAnswers[9];
    const financeInterest = interestAnswers[10];
    
    if (Object.keys(interestAnswers).length === 0) {
      return true; // Show all if no quiz data
    }
    
    const keywords = [];
    if (subjectInterest === "Science") {
      keywords.push("engineering", "tech", "data", "science", "biotech", "medical");
    }
    if (subjectInterest === "Commerce") {
      keywords.push("finance", "business", "sales", "marketing", "hr", "operations");
    }
    if (subjectInterest === "Arts") {
      keywords.push("content", "design", "graphic", "media", "journalism", "photography", "fashion", "interior");
    }
    if (subjectInterest === "Vocational") {
      keywords.push("technical", "operations", "support", "engineering");
    }
    if (techInterest === "Yes") {
      keywords.push("web", "mobile", "tech", "data", "cybersecurity", "ai", "cloud");
    }
    if (designInterest === "Yes") {
      keywords.push("design", "graphic", "ui/ux", "animation");
    }
    if (financeInterest === "Yes") {
      keywords.push("finance", "business", "commerce");
    }

    const internshipTitle = internship.title.toLowerCase();
    return keywords.some(keyword => internshipTitle.includes(keyword));
  };
  
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === '' || internship.location.toLowerCase() === selectedLocation.toLowerCase();
    const matchesStipend = minStipend === '' || parseInt(internship.stipend.replace(/[^0-9]/g, '')) >= parseInt(minStipend);
    
    const matchesPersonalization = matchesInterests(internship);
    
    return matchesSearch && matchesLocation && matchesStipend && matchesPersonalization;
  });
  
  const allLocations = [...new Set(internships.map(i => i.location))].sort();

  return (
    <div className="container mt-5 pt-5 pb-5">
      <div className="text-center mb-5">
        <h2>Recommended Internships for You</h2>
        <p className="lead text-muted">
          Based on your career quiz results and preferred location.
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-md-5 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <select 
            className="form-select" 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {allLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Min. Stipend"
            value={minStipend}
            onChange={(e) => setMinStipend(e.target.value)}
          />
        </div>
      </div>
      
      <div className="row">
        {filteredInternships.length > 0 ? (
          filteredInternships.map(internship => (
            <div key={internship.id} className="col-lg-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-success">{internship.title}</h5>
                  <p className="card-text text-muted">
                    <i className="bi bi-building me-2"></i> {internship.company}
                    <br />
                    <i className="bi bi-geo-alt-fill me-2"></i> {internship.location}
                  </p>
                  <p className="card-text">
                    <strong>Duration:</strong> {internship.duration}
                    <br />
                    <strong>Stipend:</strong> {internship.stipend}
                  </p>
                  <a href="#!" className="btn btn-sm btn-outline-success mt-2">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <p className="lead text-muted">No internships found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InternshipList;