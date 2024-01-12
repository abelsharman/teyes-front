/* eslint-disable */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const useragent = require("express-useragent");
require("dotenv").config();

const app = express();
app.use(useragent.express());
const staticPath = path.join(__dirname, "/static/");

app.use(cors());
app.use(express.static(staticPath));
app.use(morgan("short"));

const htmlDesktopPath = path.join(staticPath, "desktop/index.html");
const htmlMobilePath = path.join(staticPath, "mobile/index.html");

app.get("/", (req, res) => {
  if (req.useragent.isMobile) {
    res.sendFile(htmlMobilePath);
  } else {
    res.sendFile(htmlDesktopPath);
  }
});

app.get("/mobile", (req, res) => {
  res.sendFile(htmlMobilePath);
});

app.get("/desktop", (req, res) => {
  res.sendFile(htmlDesktopPath);
});

const port = process.env.SERVER_PORT || 9014;

app.listen(port, () => {
  global.console.log(`Server running on ${port} port`);
});
