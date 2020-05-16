// setup env variables
require('dotenv').config();
// setup app
const express = require('express');
const app = express();
//configure db
const mongoose = require('mongoose');
// rendering reqs
const ejs = require("ejs");
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// auth reqs
const passport = require('passport');
const LocalStrategy = require('passport-local');
const expressSession = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
//req models
const User = require('./models/user');
const Brew = require('./models/brew');
const Coffee = require('./models/coffee');
const Roaster = require('./models/roaster');
// require routes
const indexRoutes = require('./routes/index');
//setup mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASEURL);
// setup middlewars
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
// auth
app.use(require("express-session")({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// connect routes
app.use(indexRoutes);

app.listen(process.env.PORT, ()=>{
  console.log(`Server running on port:${process.env.PORT}`);
})
