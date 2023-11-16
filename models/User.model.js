const mongoose = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
 
    profilePic: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
