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
      "galicia",
      "asturias",
      "cantabria",
      "pais-vasco",
      "barcelona",
      "valencia",
      "murcia",
      "andalucia",
      "islas-baleares",
      "islas-canarias",
      "ceuta",
      "melilla",
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
    enum: ["surf", "nudism", "diving", "kayak"],
  },
  ratingUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Beach = model("Beach", beachSchema);
module.exports = Beach
