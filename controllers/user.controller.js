const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.user);
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
