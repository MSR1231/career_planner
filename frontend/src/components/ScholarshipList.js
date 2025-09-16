import React, { useState } from 'react';

function ScholarshipList({ scholarships }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = scholarships.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.eligibility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2>Scholarships</h2>
      <input className="form-control mb-3" placeholder="Search scholarships" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      {filtered.length === 0 ? (
        <p>No scholarships found.</p>
      ) : (
        filtered.map(s => (
          <div key={s.id} className="card mb-3 shadow">
            <div className="card-body">
              <h5>{s.name}</h5>
              <p><strong>Eligibility:</strong> {s.eligibility}</p>
              <p><strong>Amount:</strong> {s.amount}</p>
              <p><strong>Deadline:</strong> {s.deadline}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ScholarshipList;
