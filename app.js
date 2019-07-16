require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
// Passport starts
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
//app.use(passport.initialize());
//app.use(passport.session());


const stage = require('./config');
const userRoute = require('./router/user.router');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
//app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// Database
var mongoose = require('mongoose');

app.use('/',userRoute);


//passport.use(new LocalStrategy())

mongoose.connect("mongodb://localhost/testDb",()=>{
    app.listen(`${stage.port}`, () => {
        console.log(`Server now listening at localhost:${stage.port}`);
      });
})

module.exports = app;