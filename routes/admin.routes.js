const express = require("express");
const Beach = require("../models/beach.model.js");
const router = express.Router();

//GET /admin
router.get("/", (req, res, next) => {
  res.render("admin/create-form.hbs");
});
//POST /admin
router.post("/", async (req, res, next) => {
  const {
    name,
    region,
    description,
    location,
    difficultyAccess,
    entertainment,
  } = req.body;
  //check if all the values are not empty
  if (
    name === "" ||
    region === "" ||
    description === "" ||
    location === "" ||
    difficultyAccess === ""
  ) {
    res.status(400).render("admin/create-form.hbs", {
      errMessage: "All field must be filled up",
      name,
      region,
      description,
      location,
      difficultyAccess,
      entertainment,
    });
    return;
  }
  const coordinateRegex = /((-|)\d*\.\d*)/g;
  if (coordinateRegex.test(location) === false) {
    res.status(400).render("admin/create-form.hbs", {
      errMessage: "Coordintates must have rigth format",
      name,
      region,
      description,
      location,
      difficultyAccess,
      entertainment,
    });
    return;
  }

  try {
    console.log("IMPRIMIENDO", req.body);
    await Beach.create({
      name,
      region,
      description,
      location,
      difficultyAccess,
      entertainment,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
