const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model.js");

//GET "user/login"
router.get("/login", async (req, res, next) => {
  res.render("user/login.hbs");
});

//POST "user/login"
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  //check if the email or password is empty
  if (email === "" || password === "") {
    //Verificamos que ninguno de los campos quede vacio
    res.status(400).render("user/login.hbs", {
      errMessage: "all fields must be filled up",
      email,
      password,
    });
    return; //detener ruta
  }
  try {
    //search the user
    const foundUser = await User.findOne({ email });
    //check if the user is already registered
    if (foundUser === null) {
      res.status(400).render("user/login.hbs", {
        errMessage: "User not found",
        email,
        password,
      });
      return;
    }
    //check the password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (isPasswordValid === false) {
      res.status(400).render("user/login.hbs", {
        errMessage: "Wrong password!",
        email,
      });
      return;
    }

    //create  the session
    const sessionInfo = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };
    req.session.user = sessionInfo;
    req.session.save(() => {
      res.redirect(`/content`);
    });
  } catch (err) {
    next(err);
  }
});
//GET "user/signup"
router.get("/signup", async (req, res, next) => {
  res.render("user/signup.hbs");
});
//POST "user/signup"
router.post("/signup", async (req, res, next) => {
  // verify that the input are not empty
  const { username, email, password } = req.body;
  if (username === "" || email === "" || password === "") {
    res.status(400).render("user/signup.hbs", {
      errMessage: "all fields must be filled up",
      email,
      username,
    });
    return;
  }
  //check if the password type is correct
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).render("user/signup.hbs", {
      errMessage:
        "password must have at least 8 characters, one upper and one lower case letter and a number",
      email,
      username,
    });
    return;
  }
  //check if the email format is correct
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res.status(400).render("user/signup.hbs", {
      errMessage: "please writte the email in a valid format",
      username,
      email,
    });
    return;
  }

  try {
    //check if the email is not already in the DB
    const userWithSameEmail = await User.findOne({ email });
    if (userWithSameEmail !== null) {
      res.status(400).render("user/signup.hbs", {
        errMessage: "email already registered",
        username,
      });
      return;
    }
    //check if the username is not already in the DB
    const userWithSameUsername = await User.findOne({ username });
    if (userWithSameUsername !== null) {
      res.status(400).render("user/signup.hbs", {
        errMessage: "username already registered",
        email,
      });
      return;
    }
    //password crypted
    const salt = await bcrypt.genSalt(12);
    const cryptedPass = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: cryptedPass,
    });
    res.redirect("/user/login");
  } catch (err) {
    next(err);
  }
});

//GET "/user/logout"
router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;
