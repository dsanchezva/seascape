const mongoose = require("mongoose");
const Beach = require("../models/beach.model");
const allBeach = require("./beach.json")

mongoose.connect("mongodb://127.0.0.1:27017/simple-app")
.then(() => {
  console.log("Connected to DB");
  return Beach.insertMany(allBeach)
})
.then(() => {
  console.log("All beach added");
  return mongoose.disconnect()
})
.then(() => {
  console.log("Disconnected from DB");
})
.catch((err) => {
  console.log(err);
})