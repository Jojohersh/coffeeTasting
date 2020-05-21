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
    varietals: [
      {
        varietal: String
      }
    ],
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

module.exports = mongoose.model("Coffee", CoffeeSchema);
