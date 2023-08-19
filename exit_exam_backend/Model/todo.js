const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  todo_details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const todoData = mongoose.model("todo", todoSchema);
module.exports = todoData;
