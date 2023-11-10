const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({
  rating: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  beach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beach",
  },
});

const Rating = model("Rating", ratingSchema)
module.exports = Rating
