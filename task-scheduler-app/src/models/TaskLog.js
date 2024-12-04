// src/models/TaskLog.js
const mongoose = require("mongoose");

const taskLogSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  executedAt: { type: Date, default: Date.now },
  status: { type: Boolean, required: true }, // Success or Failure
});

module.exports = mongoose.model("TaskLog", taskLogSchema);
