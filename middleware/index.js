const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");

const JWT_SECRET = config.get("jwtSecret");

exports.auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    //const payload = await User.findOne(decoded._id);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

exports.isAdmin = (req, res, next) => {};
