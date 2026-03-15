// backend/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

// Signup
router.post("/signup", (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password)
    return res.status(400).json({ error: "All fields are required" });

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ error: "Username exists" });

    const hash = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (name, username, password) VALUES (?, ?, ?)", [name, username, hash], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      const token = jwt.sign({ id: result.insertId, name, username }, "secretkey");
      res.json({ message: "Signup successful", token, user: { id: result.insertId, name, username } });
    });
  });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "All fields are required" });

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ error: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user.id, name: user.name, username: user.username }, "secretkey");
    res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, username: user.username } });
  });
});

export default router;
