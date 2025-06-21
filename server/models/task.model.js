const mongoose = require("mongoose");
mongoose.set('strictQuery', true); 
const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed : {
        type : Boolean,
        default : false

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
