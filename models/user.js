const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tickets: [{ type: mongoose.ObjectId, ref: "Ticket" }],
  role: { type: String, default: "developer" },
  projects: [{ type: mongoose.ObjectId, ref: "Project" }],
});

module.exports = mongoose.model("User", userSchema);
