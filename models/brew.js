const mongoose = require('mongoose');
// Brew:
var BrewSchema = new mongoose.Schema({
//   Date (required): Date of brew
  date: String,
//   Coffee (required): Coffee that was brewed
  coffee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coffee"
  },
//   Enjoyability (required): 1 to 5 scale
  enjoyability: String,
//   Sweetness (required): how sweet 1 to 5
  sweetness: String,
//   acidity (required): general acidity 1 to 5
  acidity: String,
//   texture (required): overall texture 1 to 5
  texture: String,
//   aromatics (required): how aromatic was the coffee 1 to 5
  aromatic: String,
//   roastiness (required): noticeable roast flavors 1 to 5
  roastiness: String,
//Parameters (optional):
  parameters: {
//  coffee dose: units of dry coffee used
    dose: String,
//  water used: units of water
    water: String,
//  water temperature: temp of water
    waterTemp: String,
//  brew time: time of brew
    time: String,
//  grind size: grind size purely in relation to user
    grind: String,
//  measured TDS: tds of coffee
    tds: String,
//  equipment
    equipment: {
//    brew device: what kind of coffee brewer
      device: String,
//    grinder: what kind of grinder
      grinder: String
    }
  },
//   Tasting notes:
  tastingNotes: {
//    notes[]: flavors derived from SCAA flavor wheel
      note1: String,
      note2: String,
      note3: String
  }
});

module.exports = mongoose.model("Brew", BrewSchema);
