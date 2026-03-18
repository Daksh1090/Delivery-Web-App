import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 👉 get token (from cookie OR header)

    console.log("BYYYYYYYYYYYYYYYY")
    let token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

      console.log(token)
    if (!token) {
      return res.status(401).json({ message: "No token, Unauthorized" });
    }

    // 👉 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👉 attach user info
    req.user = decoded;
    console.log("decoded", decoded);

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};