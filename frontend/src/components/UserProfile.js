import React from 'react';

function UserProfile({ user }) {
  if (!user) return <p>No user data available.</p>;
  return (
    <div className="container py-5">
      <h3>Your Profile</h3>
      <ul className="list-group">
        <li className="list-group-item"><strong>Full Name: </strong>{user.fullName}</li>
        <li className="list-group-item"><strong>Email: </strong>{user.email}</li>
        <li className="list-group-item"><strong>Class: </strong>{user.currentClass}</li>
        <li className="list-group-item"><strong>Age: </strong>{user.age}</li>
      </ul>
    </div>
  );
}

export default UserProfile;
