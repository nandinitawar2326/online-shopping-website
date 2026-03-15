import React, { useState } from "react";

export default function Signup({ setUser, setView }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !username || !password) return alert("Please fill all fields");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.error || "Signup failed");
      }

      // ✅ Use correct user property
      setUser({ id: data.user.id, name: data.user.name, username: data.user.username });

      // Store token in localStorage for future requests
      localStorage.setItem("token", data.token);

      setView("home");
      alert(`Welcome ${data.user.name}, your account has been created!`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={btnStyle}>
          Signup
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  margin: "10px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};
const btnStyle = {
  padding: "10px",
  background: "#ff3f6c",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
