import React from 'react';

function Leaderboard({ users }) {
  if (!users || users.length === 0) return <p>No leaderboard data.</p>;

  return (
    <div className="container py-5">
      <h3>Top Scorers & Achievers</h3>
      <ol className="list-group list-group-numbered">
        {users.map((user, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name} 
            <span className="badge bg-primary rounded-pill">{user.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
