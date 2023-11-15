const express = require("express");
const Beach = require("../models/beach.model.js");
const router = express.Router();
const uploader = require("../middlewares/cloudinary.middleware.js");

//GET /admin
router.get("/", (req, res, next) => {
  res.render("admin/create-form.hbs");
});
//POST /admin
router.post("/", uploader.single("image"), async (req, res, next) => {
  const {
    name,
    region,
    description,
    location,
    difficultyAccess,
    entertainment,
  } = req.body;
  let beachPic = "";
  if (req.file) {
    beachPic = req.file.path;
  }

  //check if all the values are not empty
  if (
    name === "" ||
    region === "" ||
    description === "" ||
    location === "" ||
    difficultyAccess === "" ||
    beachPic === ""
  ) {
    res.status(400).render("admin/create-form.hbs", {
      errMessage: "All field must be filled up",
      name,
      region,
      description,
      location,
      difficultyAccess,
      entertainment,
      beachPic,
    });
    return;
  }
  const coordinateRegex = /^[-+]?\d{1,2}(?:\.\d+)?,\s*[-+]?\d{1,3}(?:\.\d+)?$/;
  if (coordinateRegex.test(location) === false) {
    res.status(400).render("admin/create-form.hbs", {
      errMessage: "Coordintates must have rigth format",
      name,
      region,
      description,
      location,
      difficultyAccess,
      entertainment,
      beachPic,
    });
    return;
  }

  try {
    await Beach.create({
      name,
      region,
      description,
      location,
      difficultyAccess,
      entertainment,
      beachPic,
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// GET "/edit/:id"
router.get("/edit/:id", async (req, res, next) => {
  try {
    const beachToEdit = await Beach.findById(req.params.id);
    const { location } = beachToEdit;
    const latitude = location[0];
    const longitude = location[1];
    res.render("admin/edit-form.hbs", { beachToEdit, latitude, longitude });
  } catch (err) {
    next(err);
  }
});

// POST "/edit/:id"
router.post("/edit/:id", async (req, res, next) => {
  const {
    name,
    region,
    description,
    location,
    difficultyAccess,
    entertainment,
    beachPic,
  } = req.body;
  const latitude = location[0];
  const longitude = location[1];
  //check if all the values are not empty
  if (
    name === "" ||
    region === "" ||
    description === "" ||
    location === "" ||
    difficultyAccess === "" ||
    beachPic === ""
  ) {
    res.status(400).render("admin/edit-form.hbs", {
      errMessage: "All field must be filled up",
      beachToEdit: {
        name,
        region,
        description,
        location,
        difficultyAccess,
        entertainment,
        beachPic,
      },
      latitude,
      longitude,
    });
    return;
  }
  const coordinateRegex = /^[-+]?\d{1,2}(?:\.\d+)?,\s*[-+]?\d{1,3}(?:\.\d+)?$/;
  if (coordinateRegex.test(location) === false) {
    res.status(400).render("admin/edit-form.hbs", {
      errMessage: "Coordintates must have rigth format",
      beachToEdit: {
        name,
        region,
        description,
        location,
        difficultyAccess,
        entertainment,
        beachPic,
      },
      latitude,
      longitude,
    });
    return;
  }

  try {
    await Beach.findByIdAndUpdate(req.params.id, {
      name,
      region,
      description,
      location,
      difficultyAccess,
      entertainment,
      beachPic,
    });
    res.redirect(`/content/${req.params.id}/beachInfo`);
  } catch (err) {
    next(err);
  }
});

// POST "/admin/delete/:id"
router.post("/delete/:id", async (req, res, next) => {
  try {
    await Beach.findByIdAndDelete(req.params.id);
    res.redirect("/content/all");
  } catch (err) {
    next(err);
  }
});

//Upload picture

router.post("/upload/:id", uploader.single("image"), async (req, res, next) => {
  if (!req.file) {
    res.status(400).redirect(`/content/${req.params.id}/beachInfo`);
    return;
  }
  try {
    await Beach.findByIdAndUpdate(req.params.id, {
      beachPic: req.file.path,
    });
    res.redirect(`/content/${req.params.id}/beachInfo`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
