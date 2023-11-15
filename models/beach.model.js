const mongoose = require("mongoose");

const beachSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: true,
    enum: [
      "Andalucía",
      "Principado de Asturias",
      "Baleares",
      "Canarias",
      "Cantabria",
      "Cataluña",
      "Comunidad Valenciana",
      "Extremadura",
      "Galicia",
      "Comunidad de Madrid",
      "Región de Murcia",
      "País Vasco",
      "Ciudad Autónoma de Ceuta",
      "Ciudad Autónoma de Melilla",
    ],
  },
  description: {
    type: String,
    require: true,
  },
  location: {
    type: [Number],
    require: true,
  },
  difficultyAccess: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  entertainment: {
    type: [String],
    enum: ["Surf", "Nudism", "Diving", "Kayak", ""],
  },
  beachPic: String,
  // ratingUser: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

const Beach = mongoose.model("Beach", beachSchema);
module.exports = Beach;
