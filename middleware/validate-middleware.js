const User = require('../models/user');
const validator = require('../helpers/validate');

const signup = (req,res,next) => {
  const validationRule = {
    "*.username": 'required',
    "*.email": 'required|email',
    "*.password": "required|string|min:8"
  };
  var user = req.body.user;
  user.password = req.body.password;
  // *********************************************
  console.log(user);
  // *********************************************
  validator(req.body, validationRule, {}, (err,status)=>{
    if (!status) {
      res.status(412)
          .send({
            success: false,
            message: 'Validation failed',
            data: err
          });
    } else {
      next();
    }
  });
}

module.exports = {
  signup
}
