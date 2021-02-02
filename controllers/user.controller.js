const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    let user_id = req.params.id;
    if (!user_id) user_id = req.user.user;
    const user = await User.findById(user_id);
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({});
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
