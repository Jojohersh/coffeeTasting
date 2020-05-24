const mongoose = require('mongoose');

// Roaster:
var RoasterSchema = new mongoose.Schema({
  //   Name (required): Name
  name: String,
  //   Location (required): where are they from
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
  },
//   Website (preferred): website of the company
  website: String,
//   Coffees[]: all coffees linked to the roaster
  coffees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coffee"
    }
  ],
  addedBy: {
    name: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});

module.exports = mongoose.model("Roaster", RoasterSchema);
