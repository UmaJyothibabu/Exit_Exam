const router = require("express").Router();

const todoData = require("../Model/todo");

// listing tasks
router.get("/todolist", async (req, res) => {
  try {
    let tasks = await todoData.find();
    res.json(tasks);
  } catch (error) {
    res.json({ message: "Unable to load", err: error.message });
  }
});

// adding new tasks
router.post("/todolist", async (req, res) => {
  try {
    const newData = todoData(req.body);
    const saveData = await newData.save();
    res.json({ message: "Task added successfully" });
  } catch (error) {
    res.json({ message: "Unable to add" });
  }
});

// modinfiying status
router.put("/todolist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todoData.findByIdAndUpdate(id, req.body);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.json({ message: "unable to update", err: error.message });
  }
});

// deleting task
router.delete("/todolist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todoData.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.json({ message: "unable to delete", err: error.message });
  }
});
module.exports = router;
