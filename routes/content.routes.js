const express = require("express");
const router = express.Router();
const Beach = require("../models/beach.model.js");
const User = require("../models/User.model.js");
const Comment = require("../models/comment.model.js");

router.get("/", async (req, res, next) => {
  res.render("content/main-page.hbs");
  try {
  } catch (err) {
    next(err);
  }
});

// GET "/content/all"
router.get("/all", async (req, res, next) => {
  try {
    const allBeachs = await Beach.find().select({
      beachPic: 1,
      name: 1,
      region: 1,
    });
    res.render("content/all-beach.hbs", { allBeachs });
  } catch (err) {
    next(err);
  }
});

// GET "/content/allRegion"
router.get("/allRegion", async (req, res, next) => {
  try {
    const allRegions = await Beach.distinct("region");
    res.render("content/region.hbs", { allRegions });
  } catch (err) {
    next(err);
  }
});

// GET "/content/:region/beachRegion"
router.get("/:region/beachRegion", async (req, res, next) => {
  try {
    const beachs = await Beach.find({ region: req.params.region }).select({
      beachPic: 1,
      name: 1,
      region: 1,
    });
    res.render("content/beach-per-region.hbs", {
      beachs,
      regionName: req.params.region,
    });
  } catch (err) {
    next(err);
  }
});

// Get "/content/:id/beachInfo"
router.get("/:id/beachInfo", async (req, res, next) => {
  try {
    const beach = await Beach.findById(req.params.id);
    const allComment = await Comment.find({ beach: req.params.id }).populate(
      "user"
    );
    allComment.forEach((comment) => {
      if (comment.user._id == req.session.user._id) {
        comment.isOwner = true;
      } else {
        comment.isOwner = false;
      }
    });
    console.log(beach);
    res.render("content/single.hbs", {
      beach,
      allComment,
      lat: beach.location[0],
      lon: beach.location[1],
    });
  } catch (err) {
    next(err);
  }
});

//GET "/content/profile/:id"
router.get("/profile", async (req, res, next) => {
  try {
    const userToSend = await User.findById(req.session.user._id);
    const allCommentUser = await Comment.find({
      user: req.session.user._id,
    }).populate("beach");

    res.render("content/user-profile.hbs", { userToSend, allCommentUser });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
