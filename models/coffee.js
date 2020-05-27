const mongoose = require('mongoose');
// Coffee:
var CoffeeSchema = new mongoose.Schema({
//   Name (required): name of the coffee
  name: String,
//   Roaster (required): who roasted the coffee
  roaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roaster"
  },
//   Blend Info:
  blendInfo: [
    {
      _id: false,
      country: String,
      process: String
    }
  ],
//     Countries in blend:
  singleOInfo: {

//   Single Origin Info:
//     Country:
    country: String,
//     Region:
    region: String,
//     Farmer:
    farm: String,
//     Elevation:
    elevation: String,
//     Varietals;
    varietals: [String],
//     Process:
    process: String
  },
//   Online store link:
  coffeeUrl: String,
//   added by (required): which user added the coffee
  addedBy: {
    name: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  // count of users who have brewed this coffee
  userCount: String
});

CoffeeSchema.methods.extractBlend = function(blendInfo) {
  // pull the coffees from the html req
  for (let coffee of Object.entries(blendInfo)) {
    // coffee[0] is just the parameter name, coffee[1] contains the actual data object
    var coffeeInfo = coffee[1];
    if (coffeeInfo.country.length > 0) {
      //store coffees that exist
      this.blendInfo.push(coffeeInfo);
    }
  }
}

CoffeeSchema.methods.extractVarietals = function(varietals) {
  //separate the comma separated string of varietals
  var varietalArray = varietals.split(/\s?\,\s?/);
  // push to the Coffee varietal array
  for (let varietal of varietalArray) {
    this.singleOInfo.varietals.push(varietal);
  }
}

module.exports = mongoose.model("Coffee", CoffeeSchema);
