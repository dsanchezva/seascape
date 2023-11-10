const express = require("express");
// const User = require("../models/User.model");
const router = express.Router()
const bcrypt = require("bcryptjs")

//GET "user/login"
router.get("/login", async (req, res, next) =>{
   res.render("user/login.hbs")
})

//POST "user/login"
router.post("/login", async (req, res, next) =>{
    try{

    }
    catch(err){
        next(err)
    }
})
//GET "user/signup"
router.get("/signup", async (req, res, next) =>{
    try{

    }
    catch(err){
        next(err)
    }
})
//POST "user/signup"
router.post("/signup", async (req, res, next) =>{
    try{

    }
    catch(err){
        next(err)
    }
})







module.exports = router