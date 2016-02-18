var api = require('../db/api')
var express = require('express')
var router = express.Router()
var db = require('../db/dbconnect')
var ObjectID = require('mongodb').ObjectID

/* Route to retrieve information for a user account */
router.get('/:userID', function(req, res, next) {
  var results = testUserID(res, req.params.userID)
  if (!results.userID) {
    return next(results)
  }
  var userID = results.userID

  api.users.getUser(db.get(), userID).then(function(results) {
    if (results.length < 1) {
      next(new Error("Could not find the user: " + req.params.userID))
    } else {
      res.json({ "user": results[0] })
    }
  }).catch(function(error) {
    next(error)
  })
})

/* Route to update a user account */
router.put('/:userID', function(req, res, next) {
  var results = testUserID(res, req.params.userID)
  if (!results.userID) {
    return next(results)
  }
  var userID = results.userID

  if (checkErrorUserData(res, req.body)) {
    return next()
  }

  api.users.updateUser(db.get(), userID, req.body).then(function(results) {
    if (results.result.nModified === 1) {
      res.json({ "success": "User updated correctly."})
    } else if (results.result.n === 1) {
      next(new Error('User not updated correctly.'))
    } else {
      next(new Error('User was not found.'))
    }
  }).catch(function(error) {
    next(error)
  })
})

/* Route to delete a user account */
router.delete('/:userID', function(req, res, next) {
  var results = testUserID(res, req.params.userID)
  if (!results.userID) {
    return next(results)
  }
  var userID = results.userID

  api.users.deleteUser(db.get(), userID).then(function(results) {
    if (results.deletedCount === 1) {
      res.json({ "success": "User deleted successfully."})
    } else if (results.result.n === 0) {
      next(new Error("User was not found."))
    } else {
      next(new Error("User not deleted correctly."))
    }
  }).catch(function(error) {
    next(error)
  })
})

module.exports = router;

function testUserID(res, id) {
  try {
    var results = {}
    results.userID = ObjectID(id)
    return results
  }
  catch(error) {
    return new Error('Invalid user ID. ' + error.message + '.')
  }
}

function checkErrorUserData(res, data) {
  if (typeof data.email === 'undefined') {
    res.json({
      "error": "Invalid PUT or POST format. See below for correct format.",
      "message": {
        "format": "Format must contain all three fields as a JSON object.",
        "correct_format": {
          "email": "USER EMAIL"
        }
      }
    })
    return true
  }
  return false
}
