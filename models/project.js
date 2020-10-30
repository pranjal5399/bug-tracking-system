const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.ObjectId, ref: "User" },
  manager: { type: mongoose.ObjectId, ref: "User" },
  developers: [{ type: mongoose.ObjectId, ref: "User" }],
  tickets: [{ type: mongoose.ObjectId, ref: "Ticket" }],
  creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
