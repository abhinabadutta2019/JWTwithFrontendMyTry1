const { Router } = require("express");
const User = require("../models/User");
const router = Router();
const jwt = require("jsonwebtoken");

// function--creating jwt token
const createToken = (id) => {
  return jwt.sign({ id }, "jwt secret key"); //jwt.sign
};
//
router.get("/signup", (req, res) => {
  res.render("signup");
});
//
router.get("/login", (req, res) => {
  res.render("login.ejs");
});
//signup post route
router.post("/signup", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    //user theke user._id- token creation er jonno lagche
    const token = createToken(user._id); //createToken() function called here--created on line 7
    //cookie
    res.cookie("jwt", token); //jwt is the name of the cookie
    // res.status(201).json({ user: user._id }); //ekane respone hisabe- user er jagay sudhu user._id send korche
    //ekhane full user pathacchi
    res.status(201).json({ user: user });
    // res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({});
  }
});

//login post route
router.post("/login", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  try {
    const user = await User.login(email, password);
    console.log(user);
    //create jwt token
    const token = createToken(user._id);
    //create cookie
    res.cookie("jwt", token);
    res.send();
  } catch (err) {
    res.status(400).json({});
  }
});

//
//logout
router.get("/logout", async (req, res) => {
  //resetting the value of token to '' empty string
  res.cookie("jwt", "", { maxAge: 1 }); //maxAge of the value is 1 mili second
  res.redirect("/");
});
//
module.exports = router;
