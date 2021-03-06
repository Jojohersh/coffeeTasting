const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user');

const { signupValidationRules, validate} = require('../middleware/validate-middleware');
const checkAvailability = require('../middleware/check-availability.js');

router.get("/", (req,res)=>{
  res.render("index");
});
//REGISTER
router.get("/register", (req,res)=>{
  res.render("register");
});

router.post("/register", signupValidationRules(), validate, checkAvailability("email"), checkAvailability("username") ,(req,res)=>{
  var newUser = new User({
    username:req.body.username,
    email: req.body.email
  });
  User.register(newUser, req.body.password, (err, newUser)=>{
    if (err) {
      console.log("Error registering new user");
      req.flash("error", err);
      return res.redirect("back");
    }
    console.log("new user " + newUser);
    console.log("preparing to authenticate");
    passport.authenticate("local")(req,res,()=>{
      console.log("passport.authenticate running...");
      req.flash("success",`Thank you for registering ${newUser.username}`);
      res.redirect(`/user/${newUser.username}`);
    });
  });
});
//LOGIN
router.get("/login", (req,res)=>{
  res.render("login");
});

router.post("/login",
            passport.authenticate("local",
            {
              failureRedirect:"/login",
              failureFlash: "Login failed"
            }),
            (req,res)=>{
              req.flash("success","successfully logged in");
              res.redirect(`/user/${req.user.username}`);
});

//LOGOUT
router.get("/logout",(req,res)=>{
  req.logout();
  req.flash("success", "successfully logged out");
  res.redirect("back");
});

module.exports = router;
