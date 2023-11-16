const express = require("express");
const Beach = require("../models/beach.model.js");
const router = express.Router();
const User = require("../models/User.model");
const Rating = require("../models/rating.model.js");

//POST rating create
router.post("/create/:id", async (req, res, next) => {
  const { rating } = req.body;
  const beach = req.params.id;
  const user = req.session.user._id;
  const newRating = {
    rating,
    beach,
    user,
  };
  try {
    await Rating.create(newRating);
    res.redirect(`/content/${beach}/beachInfo`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
