const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ไม่มี header
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // รูปแบบต้องเป็น: Bearer xxx
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid or expired" });
    }

    // 🔥 จุดสำคัญ
    req.user = {
    id: decoded.id,
    fullname: decoded.fullname
  }

    next();
  });
};
