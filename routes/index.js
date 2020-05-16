const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const validation = require('../middleware/validate-middleware');

router.get("/", (req,res)=>{
  res.render("index");
});
//REGISTER
router.get("/register", (req,res)=>{
  res.render("register");
});

router.post("/register", validation.signup ,(req,res)=>{
  res.send("Validated");
  // var newUser = new User(req.body.user);
  // User.register(newUser, req.body.password, (err, newUser)=>{
  //
  // });
});
//LOGIN
router.get("/login", (req,res)=>{
  res.render("login");
});

router.post("/login",
            passport.authenticate("local",
            {
              successRedirect:"/campgrounds",
              failureRedirect:"/login"
            }),
            (req,res)=>{
});

module.exports = router;
