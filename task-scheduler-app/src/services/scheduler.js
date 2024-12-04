// src/services/scheduler.js
const nodeCron = require("node-cron");
const Task = require("../models/Task");
const transporter = require("./mailer");
const logTaskExecution = require("./logTaskExecution");

const scheduleTasks = async () => {
  const tasks = await Task.find({ status: true });
  tasks.forEach((task) => {
    nodeCron.schedule(task.cronTime, async () => {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: task.email,
          subject: "Task Reminder",
          text: task.message,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email sent for task: ${task.name}`);
        await logTaskExecution(task, true);
      } catch (error) {
        console.error(`Failed to execute task: ${task.name}`, error);
        await logTaskExecution(task, false);
      }
    });
  });
};

module.exports = scheduleTasks;
