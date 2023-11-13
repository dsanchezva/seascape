const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middleware.js");
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});

const userRouter = require("./user.routes.js");
router.use("/user", userRouter);

const adminRouter = require("./admin.routes.js");
router.use("/admin", isLoggedIn, isAdmin, adminRouter);

const contentRouter = require("./content.routes.js");
router.use("/content", isLoggedIn, contentRouter);

const commentRouter = require("./comment.routes.js");
router.use("/comment", isLoggedIn, commentRouter);

module.exports = router;
