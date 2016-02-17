var api = require('../db/api')
var express = require('express')
var router = express.Router()
var db = require('../db/dbconnect')
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
    api.users.createUser(db.get, user).then(function(results) {
      user.tasks = results.ops[0].tasks
      user._id = results.ops[0]._id
      done(null, user)
    }).catch(function(error) {
      res.json({
        "error": "Error creating user.",
        "message": error
      })
    })
  }
))

router.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    if (err) {
      next(err);
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          next(err);
        } else {
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
    res.end('success')
  }
);

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
