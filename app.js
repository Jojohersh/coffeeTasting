// setup env variables
require('dotenv').config();
// setup app
const express = require('express');
const app = express();
//configure db
const mongoose = require('mongoose');
// rendering reqs
const ejs = require("ejs");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// auth reqs
const passport = require('passport');
const localStrategy = require('passport-local');
const expressSession = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');

//setup mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASEURL);


app.listen(process.env.PORT, ()=>{
  console.log(`Server running on port:${process.env.PORT}`);
})
