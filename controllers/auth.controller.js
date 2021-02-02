const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const config = require("config");
require("dotenv").config();
//const process.env.JWT_SECRET = config.get("jwtSecret");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    let savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ user: savedUser.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ email });
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.isValidToken = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      console.log("No token found");
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      console.log("Token not verified");
      return res.json(false);
    }

    const user = await User.findById(verified.user);
    if (!user) {
      console.log("No user found");
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.logout = async (req, res) => {
//   try {
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 0 });
//     res.status(200).json({ token });
//   } catch (error) {}
// };
