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
  const statesList = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  return [
    body("name").not().isEmpty().withMessage("Name is a required field").matches(/^[A-Za-z0-9 \.&]+$/).trim(),
    body("location.address").not().isEmpty().withMessage("Address is a required field").matches(/^[0-9]+[\w \.&]+$/).trim(),
    body("location.city").not().isEmpty().withMessage("City is a required field").matches(/^[A-Za-z0-9 ]+$/).trim(),
    body("location.state").not().isEmpty().withMessage("State is a required field").isLength({max:2})
      .custom((value, {req}) => {
      if (statesList.indexOf(value) === -1) {
        throw new Error("State must be a valid state");
      } else {
        return true;
      }
    }),
    body("location.country").not().isEmpty().withMessage("Country is a required field").isLocale(),
    body("location.zipcode").not().isEmpty().withMessage("Zipcode is a required field").isPostalCode('US'),
    body("website").not().isEmpty().withMessage("Website is a required field").isURL(),
  ]
}

// middleware validates against previously called rules
const validate = (req,res,next) => {
  const result = validationResult(req);
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
