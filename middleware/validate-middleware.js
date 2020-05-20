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
// middleware validates against previously called rules
const validate = (req,res,next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  var errorMessages = [];
  for (var error in result.errors) {
    errorMessages.push(error);
  }
  req.flash("error", result.errors);
  return res.status(400).redirect("back");
}

module.exports = {
  signupValidationRules,
  validate
}
