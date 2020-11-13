const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  name: { type: String, required: true },
  project: { type: mongoose.ObjectId, ref: "Project", required: true },
  description: { type: String, required: true },
  severity: { type: String, required: true },
  status: { type: String, default: "Not opened", required: true },
  user: { type: mongoose.ObjectId, ref: "User" },
  image: { type: String },
  creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
