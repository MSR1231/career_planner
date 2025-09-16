import React, { useState } from 'react';

function ExamGuides({ examGuides }) {
  const [search, setSearch] = useState('');

  const filtered = examGuides.filter(guide => 
    guide.exam_name.toLowerCase().includes(search.toLowerCase()) ||
    guide.full_form.toLowerCase().includes(search.toLowerCase()) ||
    guide.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2>Exam Guides</h2>
      <input className="form-control mb-3" placeholder="Search exams" value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.length === 0 ? <p>No exams found.</p> : filtered.map(guide => (
        <div key={guide.id} className="card mb-3 shadow">
          <div className="card-body">
            <h5>{guide.exam_name} ({guide.full_form})</h5>
            <p>{guide.description}</p>
            <div><strong>Stream:</strong> {guide.streams.join(', ')}</div>
            <div><strong>Difficulty Level:</strong> {guide.difficulty_level}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExamGuides;
