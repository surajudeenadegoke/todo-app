require('dotenv').config()
const mongoose = require("mongoose");
const myDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database is already connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = {
  myDb,
};
