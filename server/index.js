const {myDb} = require ("../database/db.js")
const router = require('../Routes/task.route')

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

myDb();

app.use(express.json());
app.use(cors());
app.use('/api/task',router)

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
