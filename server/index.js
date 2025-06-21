require("dotenv").config();
const { myDb } = require("../server/database/db.js");
const router = require("./Routes/task.route");

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

myDb();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
