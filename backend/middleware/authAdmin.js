import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const authAdmin = async (req, res, next) => {
  try {

    const token = req.cookies.token; // get token from cookie

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.userId]
    );

    if (!user.rows[0] || user.rows[0].role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.user = decoded;

    next();

  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
