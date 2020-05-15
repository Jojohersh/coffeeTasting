require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const ejs = require("ejs");
const expressSession = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

app.listen(process.env.PORT, ()=>{
  console.log(`Server running on port:${process.env.PORT}`);
})
