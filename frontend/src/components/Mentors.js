import React, { useEffect, useState } from 'react';

function Mentors() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch('/api/mentors')
      .then(res => res.json())
      .then(setMentors)
      .catch(() => setMentors([]));
  }, []);

  return (
    <div style={{padding:20}}>
      <h3>Mentors</h3>
      <ul>
        {mentors.map((m, i) => (
          <li key={i}>
            <strong>{m.name}</strong> - Language: {m.language || 'N/A'}, Expertise: {m.expertise || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mentors;
