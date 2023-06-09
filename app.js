const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://127.0.0.1:27017/15th-March";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home.ejs"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies.ejs"));
//routes app.use
app.use(authRoutes);

///////
// cookies

// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");
//   // using cookie-parser
//   //first-name of the cookie,second - value of the cookie
//   res.cookie("newUser", false);
//   res.send("you got the cookies");
// });

// //get/access the cookies
// app.get("/read-cookies", (req, res) => {
//   const cookies = req.cookies;

//   console.log(cookies);
//   res.json(cookies);
// });
