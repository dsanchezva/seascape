const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("content/main-page.hbs");

  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
