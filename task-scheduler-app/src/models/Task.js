// src/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cronTime: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: Boolean, default: true }, // Active/Inactive
});

module.exports = mongoose.model("Task", taskSchema);
