const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controller/task.controller.js");

const express = require("express");
const router = express.Router();

router.post("/", addTask);
router.get("/", getTasks);

router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
module.exports = router;
