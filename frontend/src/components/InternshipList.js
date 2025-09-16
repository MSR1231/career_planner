import React, { useState } from 'react';

function InternshipList({ internships }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = internships.filter(i =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2>Internship Opportunities</h2>
      <input className="form-control mb-3" placeholder="Search internships" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      {filtered.length === 0 ? (
        <p>No internships found.</p>
      ) : (
        filtered.map(i => (
          <div key={i.id} className="card mb-3 shadow">
            <div className="card-body">
              <h5>{i.title} @ {i.company}</h5>
              <p><strong>Location:</strong> {i.location}</p>
              <p><strong>Start Date:</strong> {i.start_date}</p>
              <p><strong>Duration:</strong> {i.duration}</p>
              <p><strong>Stipend:</strong> {i.stipend}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default InternshipList;
