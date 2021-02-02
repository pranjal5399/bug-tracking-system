const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  submitter: { type: mongoose.ObjectId, ref: "User" },
  detail: { type: String, required: true },
  creation: { type: Date, default: Date.now },
  image: { type: String },
});

const ticketSchema = new Schema({
  name: { type: String, required: true },
  project: { type: mongoose.ObjectId, ref: "Project", required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  severity: { type: String, required: true },
  status: { type: String, default: "New", required: true },
  submitter: { type: mongoose.ObjectId, ref: "User" },
  image: { type: String },
  comments: [commentSchema],
  creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
