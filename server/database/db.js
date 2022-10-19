const mongoose = require("mongoose");
const myDb = async () => {
  try {

    const conn = await mongoose.connect("mongodb+srv://suraj:deen4real@cluster0.du2wfhc.mongodb.net/todo-app");
    console.log("Database already connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = {
  myDb,
};
