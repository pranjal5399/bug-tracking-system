const jwt = require("jsonwebtoken");
const User = require("../models/user");

//const JWT_SECRET = config.get("jwtSecret");

exports.auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const id = req.user.user;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "No user found" });
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).json({ msg: "Not admin, authorization denied" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
