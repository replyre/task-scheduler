// src/routes/logs.js
const express = require("express");
const { getTaskLogs } = require("../controllers/taskController");
const router = express.Router();

router.get("/", getTaskLogs);

module.exports = router;
