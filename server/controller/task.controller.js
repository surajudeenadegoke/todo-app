const Task = require("../models/task.model.js");
const addTask = async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.send(error.message);
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.send(task);
  } catch (error) {
    res.send(error.message);
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.send(error.message);
  }
};
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    res.send(task);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getTask,
};
