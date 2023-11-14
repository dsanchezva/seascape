const express = require("express");
const Beach = require("../models/Beach.model.js");
const router = express.Router();
const User = require("../models/User.model");
const Comment = require("../models/Comment.model.js");

//POST comment create

router.post("/create/:id", async (req, res, next) => {
  const { comment } = req.body;
  const beach = req.params.id;
  console.log(beach);
  const user = req.session.user._id;
  const newComment = {
    comment,
    beach,
    user,
  };
  try {
    await Comment.create(newComment);
    res.redirect(`/content/${beach}/beachInfo`);
  } catch (err) {
    next(err);
  }
});

//GET "/comment/edit/:id"
router.get("/comment/edit/:id", async (req, res, next) => {
  try {
    const commentToCheck = await Comment.findById(req.params.id).populate(
      "user"
    );
    if (commentToCheck.user._id === req.session.user._id) {
      res.render("comment/edit-comment.hbs");
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
