require('dotenv').load()
var api = require('../db/api')
var express = require('express')
var router = express.Router()
var mongodb = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'

/* Route to retrieve information for a user account */
router.get('/:userID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  mongodb.connect(url, function(error, db) {
    api.users.getUser(db, userID).then(function(results) {
      if (results.length < 1) {
        res.json({ "error": "Could not find user" })
      } else {
        res.json({ "user": results[0]})
      }
      db.close()
    }).catch(function(error) {
      res.json({
        "error": "Error locating user: " + req.params.userID,
        "message": error
      })
      db.close()
    })
  })
})

/* Route to create a user account */
router.post('/', function(req, res) {
  if (checkErrorUserData(res, req.body)) {
    return
  }

  mongodb.connect(url, function(err, db) {
    api.users.createUser(db, req.body).then(function(results) {
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
})

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

  mongodb.connect(url, function(err, db) {
    api.users.updateUser(db, userID, req.body).then(function(results) {
      if (results.result.nModified === 1) {
        res.json({ "success": "User updated correctly."})
      } else if (results.result.n === 1) {
        res.json({ "error": "User not updated."})
      } else {
        res.json({ "error": "User not found."})
      }
      db.close()
    }).catch(function(error) {
      res.json({
        "error": "Error updating user.",
        "message": error
      })
      db.close()
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

  mongodb.connect(url, function(err, db) {
    api.users.deleteUser(db, userID).then(function(results) {
      if (results.deletedCount === 1) {
        res.json({ "success": "User deleted successfully."})
      } else if (results.result.n === 0) {
        res.json({ "error": "User not found."})
      } else {
        res.json({ "error": "User not deleted correctly."})
      }
      db.close()
    }).catch(function(error) {
      res.json({
        "error": "Error deleting user.",
        "message": error
      })
      db.close()
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
  if (!data.first_name || !data.last_name || !data.email) {
    res.json({
      "error": "Invalid PUT or POST format. See below for correct format.",
      "message": {
        "format": "Format must contain all three fields as a JSON object.",
        "correct_format": {
          "first_name": "USER FIRST NAME",
          "last_name": "USER LAST NAME",
          "email": "USER EMAIL"
        }
      }
    })
    return true
  }
  return false
}
