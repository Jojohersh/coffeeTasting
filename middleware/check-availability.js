const User = require('../models/user.js');
// takes property to search for
const checkAvailability = (property) => {
  //returns the middleware function searching by that property
  return (req,res,next) => {
    // query to see if there is a user with the given property
    User.findOne({[property]:req.body[property]}, (err, foundUser)=>{
      if (err) {
        req.flash("error", err);
        res.redirect("back");
      }
      if (foundUser) {
        req.flash("error", `${property} already associated with an account`);
        return res.redirect("back");
      } else {
        //something here?
        next();
      }
    });
  }
}


module.exports = checkAvailability;
