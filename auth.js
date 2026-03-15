import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader); // <- debug

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretkey");
    console.log("Decoded token:", decoded); // <- debug
    req.user = { id: decoded.id, username: decoded.username, name: decoded.name };
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
