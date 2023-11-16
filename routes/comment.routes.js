const express = require("express");
const Beach = require("../models/beach.model.js");
const router = express.Router();
const User = require("../models/User.model");
const Comment = require("../models/comment.model.js");

//POST comment create
router.post("/create/:id", async (req, res, next) => {
  const { comment } = req.body;
  const beach = req.params.id;
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
router.get("/edit/:id", async (req, res, next) => {
  try {
    const commentToCheck = await Comment.findById(req.params.id).populate(
      "user"
    );
    // ponemos == para que compare el interior del objeto y no que todo sea exactamente igual
    if (commentToCheck.user._id == req.session.user._id) {
      res.render("comment/edit-comment.hbs", { commentToCheck });
    } else {
      next("User not authorized to edit this comment");
    }
  } catch (err) {
    next(err);
  }
});

// POST "/comment/edit/:id"
router.post("/edit/:id", async (req, res, next) => {
  const { comment } = req.body;
  const commentId = req.params.id;
  try {
    const commentToEdit = await Comment.findByIdAndUpdate(commentId, {
      comment,
    }).populate("beach");
    res.redirect(`/content/${commentToEdit.beach._id}/beachInfo`);
  } catch (err) {
    next(err);
  }
});

// POST "/comment/delete/:id"
router.post("/delete/:id", async (req, res, next) => {
  const commentId = req.params.id;
  try {
    const commentToDelete = await Comment.findByIdAndDelete(commentId);
    res.redirect(`/content/${commentToDelete.beach._id}/beachInfo`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
