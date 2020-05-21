const {body, validationResult} = require('express-validator');
// validation rules for creating users
const signupValidationRules = () => {
  return [
    // check inputs for valid data
    body('username').not().isEmpty().withMessage("Hmmm, I thought I recalled making username required...").isAlphanumeric().withMessage("Username must be only allphanumeric characters").trim().escape(),
    body('email').not().isEmpty().withMessage("Hmmm, I thought I recalled making email required...").isEmail().withMessage("Please enter a valid email address e.g. y0ur@email.com").trim().escape(),
    body('password').not().isEmpty().withMessage("Hmmm, I thought I recalled making password required...").isLength({min: 8}).withMessage("Password must be at least 8 characters long")
  ]
}

//validation rules for creating a coffee
const coffeeValidationRules = () => {

}

// validation rules for creating a roaster
const roasterValidationRules = () => {
  return [
    body("name").not().isEmpty().withMessage("Name is a required field").matches(/^(\w+\s?(\&\s)?)+([Cc]o\.?)?\s*$/).trim(),
    body("location.address").not().isEmpty().matches(),
  ]
}

// middleware validates against previously called rules
const validate = (req,res,next) => {
  const result = validationResult(req);
  console.log(result);
  if (result.isEmpty()) {
    return next();
  }
  var errorMessages = [];
  result.errors.forEach((error) => {
    // console.log(error);
    errorMessages.push(error.param + ": " + error.msg);
  });

  req.flash("error", errorMessages);
  return res.status(400).redirect("back");
}

module.exports = {
  roasterValidationRules,
  signupValidationRules,
  validate
}
