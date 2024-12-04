// src/services/logTaskExecution.js
const TaskLog = require("../models/TaskLog");

const logTaskExecution = async (task, status) => {
  try {
    const log = new TaskLog({
      taskName: task.name,
      status,
    });
    await log.save();
  } catch (error) {
    console.error("Failed to log task execution:", error);
  }
};

module.exports = logTaskExecution;
