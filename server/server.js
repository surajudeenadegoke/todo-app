require("dotenv").config();
const { myDb } = require("./database/db.js");
const router = require("./Routes/task.route.js");

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

myDb();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
