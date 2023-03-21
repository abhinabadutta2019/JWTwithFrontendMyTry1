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
//
router.post("/signup", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.email,
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
    res.send(400).send("error, user not created");
  }
});
//
router.post("/login", (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);

  res.send("user login1");
});
//
module.exports = router;
