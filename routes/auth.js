var express = require('express')
var router = express.Router()
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var api = require('../db/api')
var db = require('../db/dbconnect')

var env = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}

passport.use(new GoogleStrategy(
  env,
  function(accessToken, refreshToken, profile, done) {
    var user = insertUser(profile)
    findUserByEmail(user.email).then(function(user) {
      done(null, {
        user: user,
        accessToken: accessToken
      })
    }).catch(function(err) {
      if (err.userNotFound) {
        api.users.createUser(db.get(), user)
        .then(function(results) {
          user.tasks = results.ops[0].tasks
          user._id = results.ops[0]._id
          done(null, {
            user: user,
            accessToken: accessToken
          })
        }).catch(function(error) {
          res.json({
            "error": "Error creating user.",
            "message": error
          })
          done(err)
        })
      } else {
        done(err)
      }
    })
  }
))

router.get('/google/callback', function(req, res, next) {
  passport.authenticate('google', function(err, user, info) {
    console.log('this is user: ', user);
    console.log('this is err: ', err);
    console.log('this is info: ', info);
    if (err) {
      next(err);
    } else if (user) {
      req.In(user, function(err) {
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

function findUserByEmail(email) {
  return api.users.findUser(db.get(), email)
  .then(function(results) {
    if (results.length > 0) {
      return results[0]
    } else {
      return Promise.reject( { userNotFound:true } )
    }
  }).catch(function(err) {
    return Promise.reject(err)
  })
}

module.exports = {
  router: router,
  passport: passport
}
