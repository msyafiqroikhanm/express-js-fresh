const express = require("express");
const app = express();
const errorHandling = require("./helpers/errorHandling.helper");
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(routes);
app.use(errorHandling);

module.exports = app;
