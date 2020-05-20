const express = require('express');
router = express.Router();

const User = require('../models/user');
const Brew = require('../models/brew');
const Coffee = require('../models/coffee');
const Roaster = require('../models/roaster');
const {} = require('../middleware/validate-middleware');

router.get("/", (req,res)=>{
  res.status(404);
  req.flash("error", "not a page");
  res.redirect("/");
});

router.get("/:username", (req,res)=>{
  var userToFind = req.params.username;
  User.findOne({username:userToFind}, (err,foundUser)=>{
    if (err) {
      res.status(400);
      req.flash("error", err);
      res.redirect("back");
    } else if (!foundUser) {
      res.status(404);
      req.flash("error", `User: \"${req.params.username}\" not found`);
      res.redirect("back");
    } else {
      res.status(200);
      res.render("user/show", {profile: foundUser});
    }
  });
});

module.exports = router;
