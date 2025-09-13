import React from "react";
function UserProfile({ user }) {
  if (!user) return null;
  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      padding: 20,
      margin: 15,
      boxShadow: "0 2px 8px #888"
    }}>
      <h3>Your Profile</h3>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}
export default UserProfile;