// 데이터베이스 세팅
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(process.env.DB).then(() => {
  console.log("connected to database");
});

module.exports = app;
