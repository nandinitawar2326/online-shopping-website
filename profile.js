import React from "react";

export default function Profile({ user }) {
  if (!user) {
    return (
      <div style={containerStyle}>
        <h2>You are not logged in</h2>
        <p>Please login or signup to view your profile.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>My Profile</h1>
      <div style={profileBox}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

/* --- Styles --- */
const containerStyle = {
  marginTop: "100px",
  padding: "30px",
  textAlign: "center",
};

const profileBox = {
  margin: "20px auto",
  padding: "20px",
  maxWidth: "400px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  background: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
