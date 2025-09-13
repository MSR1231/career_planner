import React, { useState } from 'react';

function ScholarshipList({ scholarships, userInterests }) {
  const [searchTerm, setSearchTerm] = useState('');

  const matchesInterests = (scholarship) => {
    const interestAnswers = userInterests;
    const subjectInterest = interestAnswers[1];
    
    if (Object.keys(interestAnswers).length === 0) {
      return true; // Show all if no quiz data
    }
    
    const keywords = [];
    if (subjectInterest === "Science") {
      keywords.push("inspire", "kvpy", "gate", "jrf", "engineering", "technical");
    }
    if (subjectInterest === "Commerce") {
      keywords.push("management", "commerce", "finance");
    }
    if (subjectInterest === "Arts") {
      keywords.push("arts", "humanities", "social sciences", "law");
    }
    if (subjectInterest === "Vocational") {
      keywords.push("technical");
    }

    const scholarshipName = scholarship.name.toLowerCase();
    const eligibility = scholarship.eligibility.toLowerCase();
    
    const combinedText = `${scholarshipName} ${eligibility}`;
    
    return keywords.some(keyword => combinedText.includes(keyword));
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scholarship.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPersonalization = matchesInterests(scholarship);

    return matchesSearch && matchesPersonalization;
  });

  return (
    <div className="container mt-5 pt-5 pb-5">
      <div className="text-center mb-5">
        <h2>Recommended Scholarships for You</h2>
        <p className="lead text-muted">
          Based on your career quiz results and eligibility.
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map(scholarship => (
            <div key={scholarship.id} className="col-lg-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-info">{scholarship.name}</h5>
                  <p className="card-text">
                    <strong>Eligibility:</strong> {scholarship.eligibility}
                    <br />
                    <strong>Amount:</strong> {scholarship.amount}
                    <br />
                    <strong>Deadline:</strong> {scholarship.deadline}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <p className="lead text-muted">No scholarships found matching your criteria. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScholarshipList;