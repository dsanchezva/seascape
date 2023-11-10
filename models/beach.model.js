const { Schema, model } = require("mongoose");

const playasSchema = new Schema({
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
  dificultadAcceso: {
    type: String,
    enum: ["facil", "medio", "dificil"],
    required: true,
  },
  actividades: {
    type: [String],
    enum: ["pesca", "surf", "nudismo", "buceo"],
  },
  ratingUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
