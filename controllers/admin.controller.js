const User = require("../models/user");

exports.assignRole = async (req, res) => {
  try {
    const { role } = req.body;
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "No user found" });
    user.role = role;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
