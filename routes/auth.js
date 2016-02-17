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
    console.log(profile._json.emails[0].value);
    var user = insertUser(profile)

    mongodb.connect(url, function(err, db) {
      api.users.createUser(db, user).then(function(results) {
        user.tasks = results.ops[0].tasks
        user._id = results.ops[0]._id
        done(null, user)
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
    console.log(user);
    if (err) {
      console.log("error", err);
      next(err);
    } else if (user) {
      req.logIn(user, function(err) {
        console.log("error2 :", err);
        if (err) {
          next(err);
        } else {
          console.log('redirecting to client')
          res.json({'created_user': user});
        }
      });
    } else if (info) {
      next(info);
    }
  })(req, res, next);
});


router.get('/google', passport.authenticate('google', {
    scope: 'profile email'
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
    oauthID: profile._json.id,
    email: profile._json.emails[0].value
  }
  return user
}

module.exports = {
  router: router,
  passport: passport
}
