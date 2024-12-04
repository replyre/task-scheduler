// src/app.js
const express = require("express");
const connectDB = require("./config/db");
const scheduleTasks = require("./services/scheduler");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/tasks", require("./routes/tasks"));
app.use("/logs", require("./routes/logs"));

// Start scheduler
scheduleTasks();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
