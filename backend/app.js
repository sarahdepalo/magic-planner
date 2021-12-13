"use strict";

require('dotenv').config();

const http = require("http");
// heroku host and port:
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

// const host = "127.0.0.1";
// const port = 5000;

const cors = require("cors");
const morgan = require("morgan");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log("Server has started.");
});

const rootController = require("./routes/index");
const parksController = require("./routes/parks");
const activitiesController = require("./routes/activities");
const diningController = require("./routes/dining");
const lodgingController = require("./routes/lodging");

app.use("/", rootController);
app.use("/parks", parksController);
app.use("/activities", activitiesController);
app.use("/dining", diningController);
app.use("/lodging", lodgingController);