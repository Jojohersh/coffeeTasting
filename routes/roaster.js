const express = require('express');
const router = express.Router();
// required middleware
const {roasterValidationRules, validate} = require('../middleware/validate-middleware');
// require necessary models
const User = require('../models/user');
const Coffee = require('../models/coffee');
const Roaster = require('../models/roaster');

//SHOW
router.get("/", (req,res)=>{
  Roaster.find({}, (err, foundRoasters) => {
    if (err) {
      flash("error", err);
      res.status(400);
      res.redirect("back");
    } else {
      res.render("roaster/index", {roasters: foundRoasters});
    }
  });
});
//NEW
router.get("/new", (req,res)=>{
  res.status(200);
  res.render("./roaster/new");
});
//CREATE
router.post("/new",roasterValidationRules(), validate, (req,res)=>{
  Roaster.find({name:req.body.name}, (err, foundRoaster) =>{
    if (err) {
      res.status(400);
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }
    if (foundRoaster && foundRoaster.length > 0) {
      res.status(400);
      req.flash("error", "Roaster already exists");
      return res.redirect("/roasters");
    } else {
      var newRoaster = new Roaster({name:req.body.name, location:req.body.location, website:req.body.website});
      Roaster.create(newRoaster, (err,createdRoaster)=>{
        if (err) {
          res.status(400);
          req.flash("error", "Error creating new roaster: " + err);
          return res.redirect("/roasters");
        }
        if (createdRoaster) {
          res.status(200);
          req.flash("success", "Successfully added new roaster");
          res.redirect("/roasters/" + createdRoaster._id);
        } else {
          res.status(400);
          req.flash("error", "Something went wrong creating new roaster");
          res.redirect("/roasters");
        }
      });
    }
  });
});

//VIEW
router.get("/:id", (req,res)=> {
  Roaster.findById(req.params.id, (err, foundRoaster) =>{
    if (err) {
      res.status(400);
      req.flash("error", "something went wrong");
      return res.redirect("back");
    }
    if (foundRoaster) {
      res.status(200);
      res.render("roaster/show", {roaster: foundRoaster});
    } else {
      res.status(404);
      req.flash("error", "Roaster not found");
      res.redirect("/roasters");
    }
  });
});
module.exports = router;
