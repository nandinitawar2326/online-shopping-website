// backend/config/db.js
import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",           // Your MySQL username
  password: "nandini123", // Your MySQL password
  database: "shopping_db"
});

db.connect((err) => {
  if (err) console.log("DB Connection Failed:", err);
  else console.log("✅ Connected to MySQL DB");
});

export default db;
