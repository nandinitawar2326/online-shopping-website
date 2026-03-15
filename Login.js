import React, { useState } from "react";

export default function Login({ setUser, setToken, setView }) { // added setToken
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Please fill all fields");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Login response status:", response.status);
      const data = await response.json();
      console.log("Login response data:", data);

      if (!response.ok) return alert(data.error || "Login failed");

      // Set user and token in parent state
      setUser({ id: data.user.id, name: data.user.name, username: data.user.username });
      setToken(data.token); // update token state
      localStorage.setItem("token", data.token);

      setView("home");
      alert(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      console.error("Login fetch error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
      >
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
          Login
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
