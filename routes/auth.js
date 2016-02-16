require('dotenv').load()
var api = require('../db/api')
var mongodb = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var env = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}

passport.use(new GoogleStrategy(
  env,
  function(token, tokenSecret, profile, done){
    var user = insertUser(profile)

    mongodb.connect(url, function(err, db) {
      api.users.createUser(db, user).then(function(results) {
        res.json({ 'created_user': results.ops[0] })
        db.close()
      }).catch(function(error) {
        res.json({
          "error": "Error creating user.",
          "message": error
        })
        db.close()
      })
    })

  }
))

router.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    console.log('made it here 2')
    if (err) {
      next(err);
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          next(err);
        } else {
          console.log('redirecting to client')
          res.redirect(process.env.CLIENT_HOST);
        }
      });
    } else if (info) {
      next(info);
    }
  })(req, res, next);
});


router.get('/google', passport.authenticate('google', {
    scope: 'profile'
  }),
  function(req, res) {
    // The request will be redirected to Google for authentication, so this
    // function will not be called.

    console.log(req.user)
    res.end('success')
  });

function insertUser(profile){
  var user = {
    first_name: profile._json.name.givenName,
    last_name: profile._json.name.familyName,
    oauth: profile._json.id

  }
}

module.exports = {
  router: router,
  passport: passport
}
