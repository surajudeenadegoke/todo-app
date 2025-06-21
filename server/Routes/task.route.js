const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getTask,
} = require("../controller/task.controller.js");

const express = require("express");
const router = express.Router();

router.post("/api/task", addTask);
router.get("/api/task", getTasks);
router.put("/api/task/:id", updateTask);
router.delete("/api/task/:id", deleteTask);
router.get("/api/task/:id", getTask);
module.exports = router;
