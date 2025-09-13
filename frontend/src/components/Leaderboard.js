import React from "react";

function Leaderboard() {
  // Example static leaderboard data. Replace with dynamic state for real demo.
  const leaders = [
    { username: "rahul123", score: 94 },
    { username: "ayesha456", score: 92 },
    { username: "imran789", score: 89 },
    { username: "priya999", score: 87 }
  ];
  return (
    <div>
      <h3>Quiz Leaderboard</h3>
      <ol>
        {leaders.map((l, i) => (
          <li key={i}><b>{l.username}</b>: {l.score} pts</li>
        ))}
      </ol>
    </div>
  );
}
export default Leaderboard;