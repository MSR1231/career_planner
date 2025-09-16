import React from 'react';

function Mentors({ mentors }) {
  return (
    <div className="container py-5">
      <h2>Find Mentors</h2>
      {mentors.length === 0 ? (
        <p>No mentors available currently.</p>
      ) : (
        mentors.map(m => (
          <div key={m.id} className="card mb-3 shadow">
            <div className="card-body">
              <h5>{m.name}</h5>
              <p><strong>Field:</strong> {m.field}</p>
              <p><strong>Location:</strong> {m.location}</p>
              <p><strong>Contact:</strong> {m.contact || 'Not available'}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Mentors;
