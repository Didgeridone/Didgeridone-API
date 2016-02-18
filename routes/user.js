var api = require('../db/api')
var express = require('express')
var router = express.Router()
var db = require('../db/dbconnect')
var ObjectID = require('mongodb').ObjectID

/* Route to retrieve information for a user account */
router.get('/:userID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  api.users.getUser(db.get(), userID).then(function(results) {
    if (results.length < 1) {
      res.json({ "error": "Could not find user" })
    } else {
      res.json({ "user": results[0] })
    }
  }).catch(function(error) {
    res.json({
      "error": "Error locating user: " + req.params.userID,
      "message": error
    })
  })
})

/* Route to create a user account */
// router.post('/', function(req, res) {
//   if (checkErrorUserData(res, req.body)) {
//     return
//   }
//
//   api.users.createUser(db.get(), req.body).then(function(results) {
//     res.json({ 'created_user': results.ops[0] })
//   }).catch(function(error) {
//     res.json({
//       "error": "Error creating user.",
//       "message": error
//     })
//   })
// })

/* Route to update a user account */
router.put('/:userID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  if (checkErrorUserData(res, req.body)) {
    return
  }

  api.users.updateUser(db.get(), userID, req.body).then(function(results) {
    if (results.result.nModified === 1) {
      res.json({ "success": "User updated correctly."})
    } else if (results.result.n === 1) {
      res.json({ "error": "User not updated."})
    } else {
      res.json({ "error": "User not found."})
    }
  }).catch(function(error) {
    res.json({
      "error": "Error updating user.",
      "message": error
    })
  })
})

/* Route to delete a user account */
router.delete('/:userID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  api.users.deleteUser(db.get(), userID).then(function(results) {
    if (results.deletedCount === 1) {
      res.json({ "success": "User deleted successfully."})
    } else if (results.result.n === 0) {
      res.json({ "error": "User not found."})
    } else {
      res.json({ "error": "User not deleted correctly."})
    }
  }).catch(function(error) {
    res.json({
      "error": "Error deleting user.",
      "message": error
    })
  })
})

module.exports = router;

function testUserID(res, id) {
  var results = {}
  try {
    results.userID = ObjectID(id)
  }
  catch(error) {
    results.error = true
    res.json({
      "error": "Invalid user ID.",
      "message": error.toString()
    })
  }
  return results
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
