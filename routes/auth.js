var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var BearerStrategy = require('passport-http-bearer').Strategy
var jwt = require('jsonwebtoken')
var validator = require('validator')
var bcrypt = require('bcrypt')
var api = require('../db/api')
var db = require('../db/dbconnect')

passport.use(new LocalStrategy({
  usernameField: 'email'
  }, function(email, password, done) {
    findUserByEmail(email).then(function(user) {
      if (user && user.password !== null && bcrypt.compareSync(password, user.password)) {
        return done(null, user)
      } else {
        return done(new Error('Invalid email or Password'))
      }
    }).catch(function(err) {
      return done(err)
    })
  }
))

passport.use(new BearerStrategy(function(token, done) {
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err) {
      return done(err)
    }
    done(null, decoded.user)
  })
}))

router.post('/signup', function(req, res, next) {
  findUserByEmail(req.body.email).then(function(user) {
    console.log('user error: ', user);
    next(new Error('Email is already in use.'))
  }).catch(function(err) {
    if(err.userNotFound) {
      createUser(req.body).then(function(user) {
        createToken(user).then(function(token) {
          res.json({
            created_user: user,
            token: token
          })
        })
      }).catch(function(err) {
        console.log('create user error: ', err);
        next(err)
      })
    } else {
      next(err)
    }
  })
})

router.post('/login', function(req, res, next) {
  passport.authenticate('local',
  function(err, user, info) {
    if (err) {
      return next(err)
    }
    if (user) {
      createToken(user).then(function(token) {
        res.json({
          user: user,
          token: token
        })
      })
    } else {
      next('Invalid Login')
    }
  })(req, res, next)
})

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

function validPassword(pw) {
  return typeof pw !== 'undefined' && pw !== null && typeof pw == 'string'
}

function createUser(user) {
  if (!validator.isEmail(user.email)) {
    return Promise.reject('Invalid email.');
  }
  if (!validPassword(user.password)) {
    return Promise.reject('Password is invalid.')
  }
  var hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  return api.users.createUser(db.get(), user)
  .then(function(results) {
    user.tasks = results.ops[0].tasks
    user._id = results.ops[0]._id
    return user
  }).catch(function(error) {
    return Promise.reject(error)
  })
}

function createToken(user) {
  return new Promise(function(resolve, reject) {
    delete user.password
    var data = {
      user: user
    }
    jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' },
      function(token) {
        resolve(token)
      })
  })
}

module.exports = {
  router: router,
  passport: passport,
  authenticate: function(req, res, next) {
    passport.authenticate('bearer', function(err, user, info) {
      req.user = user
      next()
    })(req, res, next)
  }
}
