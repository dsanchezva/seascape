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
      "andalucia",
      "asturias",
      "baleares",
      "canarias",
      "cantabria",
      "cataluña",
      "comunidad valenciana",
      "extremadura",
      "galicia",
      "comunidad de madrid",
      "region de murcia",
      "pais vasco",
      "ciudad autonoma de ceuta",
      "ciudad autonoma de melilla",
    ],
  },
  description: {
    type: String,
    require: true,
  },
  location: {
    type: String,
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
  // ratingUser: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
});

const Beach = model("Beach", beachSchema);
module.exports = Beach;
