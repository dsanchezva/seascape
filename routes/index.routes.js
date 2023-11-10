const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home");
});

const userRouter = require("./user.routes.js")
router.use("/user", userRouter)

const adminRouter = require("./admin.routes.js")
router.use("/admin", adminRouter)

const contentRouter = require("./content.routes.js")
router.use("/content", contentRouter)


module.exports = router;
