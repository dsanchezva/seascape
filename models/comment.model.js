const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
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

const Comment = model("Comment", commentSchema)
module.exports = Comment
