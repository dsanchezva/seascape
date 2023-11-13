const express = require("express");
const router = express.Router();
const Beach = require("../models/beach.model.js")

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
    const allBeachs = await Beach.find().select({beachPic: 1, name: 1, region: 1})
    res.render("content/all-beach.hbs", {allBeachs})
  } catch (err) {
    next(err)
  }
})

// GET "/content/allRegion" 
router.get("/allRegion", async (req, res, next) => {
  try {
    const allRegions = await Beach.distinct("region")
    res.render("content/region.hbs", {allRegions})
  } catch (err) {
    next(err)
  }
})

// GET "/content/:region"
router.get("/:region/beachRegion", async (req, res, next) => {
  try {
    const beachs = await Beach.find({region: req.params.region}).select({beachPic: 1, name: 1, region: 1})
    res.render("content/beach-per-region.hbs", {beachs, regionName: req.params.region})
  } catch (err) {
    next(err)
  }
})

// Get "/content/:id"
router.get("/:id/beachInfo", async (req, res, next) => {
  try {
    const beach = await Beach.findById(req.params.id)
    res.render("content/single.hbs", {beach})
  } catch (err) {
    next(err)
  }
})

module.exports = router;
