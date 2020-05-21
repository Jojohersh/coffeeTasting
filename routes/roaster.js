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
      res.send(foundRoasters);
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

  res.status(201);
  res.send(req.body);
});

module.exports = router;
