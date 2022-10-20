const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getTask
} = require("../controller/task.controller.js");

const express = require("express");
const router = express.Router();

router.post("/save", addTask);
router.get("/", getTasks);

router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.get('/:id', getTask);
module.exports = router;
