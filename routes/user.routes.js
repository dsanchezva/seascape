const express = require("express");
// const User = require("../models/User.model");
const router = express.Router()
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

//GET "user/login"
router.get("/login", async (req, res, next) =>{
   res.render("user/login.hbs")
})

//POST "user/login"
router.post("/login", async (req, res, next) =>{
    const {email, password} = req.body
    if(email === "" || password === ""){ //Verificamos que ninguno de los campos quede vacio
        res.status(400).render("user/login.hbs", {
            errMessage: "all fields must be filled up",
            email, 
            password
        }) 
        return //detener ruta
    }
    try{
        

    }
    catch(err){
        next(err)
    }
})
//GET "user/signup"
router.get("/signup", async (req, res, next) =>{
   res.render("user/signup.hbs")
})
//POST "user/signup"
router.post("/signup", async (req, res, next) =>{
    const{username, email, password} = req.body
    if(username === "" || email === "" || password === ""){
        res.status(400).render("user/signup.hbs", {
            errMessage: "all fields must be filled up",
            email,
            username
        })
        return
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if(passwordRegex.test(password) === false){
        res.status(400).render("user/signup.hbs", {
            errMessage: "password must have 8 characters, at least one upper and one lower case letter and a number",
            email,
            username
        })
        return
    }
    const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (emailRegex.test(email) === false) {
    res.status(400).render("user/signup.hbs", {
      errMessage: "please writte the email in a valid format",
      username,
      email
    });
    return;
  }
  //verificar si el email ya está registrado
    try{
        const userWithSameEmail = await User.findOne({email})
        console.log("IMPRIMIENDO2", userWithSameEmail);
        if(userWithSameEmail !== null){
            res.status(400).render("user/signup.hbs", {
                errMessage: "email already registered",
                username,
                
              });
              return 
        }
        const userWithSameUsername = await User.findOne({username})
        console.log("IMPRIMIENDO2", userWithSameUsername);
        if(userWithSameUsername !== null){
            res.status(400).render("user/signup.hbs", {
                errMessage: "username already registered",
                email,
                
              });
              return 
        }
        const salt = await bcrypt.genSalt(12)
        const cryptedPass = await bcrypt.hash(password, salt)

        await User.create({
            username,
            email, 
            password: cryptedPass
        })
        res.redirect("/user/login")

    }
    catch(err){
        next(err)
    }
})







module.exports = router