const { Schema, model } = require("mongoose");

const beachSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: true,
    enum: [
      "Andalucia",
      "Principado de Asturias",
      "Baleares",
      "Canarias",
      "Cantabria",
      "Cataluña",
      "Comunidad Valenciana",
      "Extremadura",
      "Galicia",
      "Comunidad de Madrid",
      "Region de Murcia",
      "Pais Vasco",
      "Ciudad autonoma de Ceuta",
      "Ciudad autonoma de Melilla",
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
    enum: ["low", "medium", "high"],
    required: true,
  },
  entertainment: {
    type: [String],
    enum: ["surf", "nudism", "diving", "kayak", ""],
  },
  beachPic: String,
  // ratingUser: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

const Beach = model("Beach", beachSchema);
module.exports = Beach;
