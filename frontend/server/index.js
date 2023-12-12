var express = require("express");
var cors = require("cors");
const axios = require("axios");
const request = require("request");
const fs = require("fs");
const path = require("path");

var app = express();

app.use(cors({ origin: true }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const uploadsFolder = path.join(__dirname, "../uploads");

// Serve uploaded files
//app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//Static folder
app.use("/", express.static("../dist"));
// app.use("/", express.static(path.join(__dirname, "../dist")));

//Server listening
app.listen(8241, () => {
  console.log("Server started on port 8241...");
});

