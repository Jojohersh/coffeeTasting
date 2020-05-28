const express = require('express');
const router = express.Router();
//models
const User = require('../models/user');
const Coffee = require('../models/coffee');
const Roaster = require('../models/roaster');
//middleware
const {validate, coffeeValidationRules} = require('../middleware/validate-middleware');

//NEW coffee
router.get("/new", (req,res)=>{
  Roaster.find({}, (err, foundRoasters) =>{
    if (err) {
      res.status(400);
      req.flash("error", "Error retrieving roasters");
      res.redirect("back");
    } else {
      res.status(200);
      res.render("coffee/new", {roasters:foundRoasters});
    }
  });
});
// CREATE coffee
router.post("/new", coffeeValidationRules(), validate, (req,res)=>{
  var info = {
    name: req.body.name,
    roaster: req.body.roaster,
    coffeeUrl: req.body.coffeeUrl,
    blendType: req.body.blendType
  }
  var newCoffee = new Coffee(info);

  if (req.body.blendType === "blend") {
    newCoffee.extractBlend(req.body.blendInfo);
  } else if (req.body.blendType === "single") {
    newCoffee.extractVarietals(req.body.singleOInfo.varietals);
    let {country, region, farm, elevation, process} = req.body.singleOInfo;
    newCoffee.singleOInfo.farm = farm;
    newCoffee.singleOInfo.region = region;
    newCoffee.singleOInfo.country = country;
    newCoffee.singleOInfo.process = process;
    newCoffee.singleOInfo.elevation = elevation;
  } else {
    res.status(400);
    req.flash("error", "Error with blend type definition.");
    res.redirect("/");
  }
  Coffee.exists({name:newCoffee.name, roaster: newCoffee.roaster})
        .then( (coffeeExists) => {
          if (coffeeExists) {
            res.status(400);
            req.flash("error", "Coffee already exists");
            res.redirect("back");
          } else {
            Coffee.create(newCoffee, (err, createdCoffee) =>{
              if (err) {
                res.status(400);
                req.flash("error", "Something went wrong creating your coffee");
                res.redirect("back");
              } else {
                Roaster.findById(createdCoffee.roaster, (err, foundRoaster) => {
                  if (err) {
                    res.status(400);
                    req.flash("error", "Error saving coffee to roaster");
                    res.redirect("back");
                  } else {
                    foundRoaster.coffees.push(createdCoffee);
                    foundRoaster.save();
                    res.status(201);
                    req.flash("success", "successfully created coffee");                    
                    res.redirect("/coffees/" + createdCoffee._id);
                  }
                });
              }
            });
          }
        }
  );
});

router.get("/:id", (req,res)=>{
  Coffee.findById(req.params.id).populate("roaster").exec( (err, foundCoffee) =>{
    if (err) {
      res.status(400);
      req.flash("error", "error finding coffee");
      res.redirect("back");
    } else {
      res.status(200);
      res.render("coffee/show", {coffee: foundCoffee});
    }
  });
});

module.exports = router;
