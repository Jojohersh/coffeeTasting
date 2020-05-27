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
const coffeeValidationRules = (req, res, next) => {
  var namingPattern = /^[A-Za-z\s\-\,]*$/;
  // specifies: letters+[max 1 space]+letters,[possible space]letters[max 1 space]letters
  var varietalListPattern = /^[A-Za-z0-9\-]+\s?[A-Za-z0-9\-]+(\,\s?[A-Za-z0-9\-]+\s?[A-Za-z0-9\-]+)*$/;

  return [
    body('roaster').not().isEmpty().isMongoId(),
    body('name').not().isEmpty().trim().escape(),
    body('blendType').custom((value, {req})=>{
      // console.log(req.body.singleOInfo);
      if (req.body.blendType === "blend") {
        if (req.body.blendInfo.coffee1.country.length < 1 && req.body.blendInfo.coffee2.country.length < 1) {
          throw new Error("Blend coffee must be specified");
        }
        for (let [key, value] of Object.entries(req.body.singleOInfo)) {
          req.body.singleOInfo[key] = "";
        }
        return true;
      } else if (req.body.blendType === "single") {
        if (req.body.singleOInfo.country.length < 1) {
          throw new Error("Single Origin Country must be specified");
        }
        for (let [key, value] of Object.entries(req.body.blendInfo)) {
          req.body.blendInfo[key].country = "";
          req.body.blendInfo[key].process = "";
        }
        return true;
      } else {
        throw new Error("Coffee must be either a blend or single origin");
      }
    }),
    body('blendInfo.*.*').optional().if(body('blendType').equals("blend")).matches(namingPattern).withMessage("Coffees and processes may only contain alphanumeric characters, spaces, and dashes").trim().escape(),
    // body('coffee2.country').if(body('blendType').equals("blend")).matches(namingPattern).trim().escape(),

    body('singleOInfo.country').if(body('blendType').equals("single")).matches(namingPattern).trim().escape(),
    body('singleOInfo.region').if(body('blendType').equals("single")).optional().matches(namingPattern).trim().escape(),
    body('singleOInfo.farm').if(body('blendType').equals("single")).optional().matches(namingPattern).trim().escape(),
    body('singleOInfo.elevation').if(body('blendType').equals("single")).optional().matches(/^([0-9]{4}(\-[0-9]{4})?)?$/).withMessage("Elevation must be 4 digits or a range (e.g. 1400-1900)"),
    body('singleOInfo.varietals').if(body('blendType').equals("single")).if(body('singleOInfo.varietals').not().isEmpty()).matches(varietalListPattern).withMessage("Varietals must be comma separated. Each Varietal may contain letters, numbers, a dash, and at most 1 space").trim().escape(),
    body('singleOInfo.process').if(body('blendType').equals("single")).optional().matches(namingPattern).trim().escape(),
    body('coffeeUrl').if(body('coffeeUrl').not().isEmpty()).isURL().trim(),
  ]
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
    body("location.country").not().isEmpty().withMessage("Country is a required field").isLocale().trim(),
    body("location.zipcode").not().isEmpty().withMessage("Zipcode is a required field").isPostalCode('US').trim(),
    body("website").not().isEmpty().withMessage("Website is a required field").isURL().trim(),
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
  coffeeValidationRules,
  roasterValidationRules,
  signupValidationRules,
  validate
}
