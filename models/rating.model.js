const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  beach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beach",
  },
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
