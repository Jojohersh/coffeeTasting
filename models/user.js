const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // list of coffees user has logged
  coffees: [
    {
    // each coffee
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coffee"
      },
    // array of brews of each coffee
      brews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "brew"
        }
      ]
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  interestedIn: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coffee"
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
