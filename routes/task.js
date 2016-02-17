var api = require('../db/api')
var express = require('express')
var router = express.Router()
var db = require('../db/dbconnect')
var ObjectID = require('mongodb').ObjectID

/* Route to retrieve information for a user's task */
router.get('/:userID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  api.tasks.getTasks(db.get(), userID)
    .then(function(results){
      if (results.length < 1) {
        res.json({ "error": "Could not find user" })
      } else {
        res.json({ "user": {
          "_id": results[0]._id,
          "tasks": results[0].tasks
        }})
      }
    }).catch(function(error) {
      res.json({
        "error": "Error locating task.",
        "message": error
      })
    })
})

/* Route to create a task for a user */
router.post('/:userID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  if (checkErrorTaskDataPost(res, req.body)) {
    return
  }

  req.body.radius = JSON.parse(req.body.radius)
  req.body.done = JSON.parse(req.body.done)
  req.body.enter = JSON.parse(req.body.enter)
  req.body.task_id = ObjectID()
  api.tasks.createTask(db.get(), userID, req.body)
    .then(function(results) {
      if (results.result.nModified === 1) {
        res.json({ "new_task": req.body })
      } else if (results.result.n === 0) {
        res.json({ "error": "User not found. Task could not be created." })
      } else {
        res.json({ "error": "Task was not created correctly." })
      }
    }).catch(function(error) {
      res.json({
        "error": "Error creating task.",
        "message": error
      })
    })
})

/* Route to update a task for a user */
router.put('/:userID/:taskID', function(req, res) {
  var userIdResults = testUserID(res, req.params.userID)
  var userID = userIdResults.userID
  if (userIdResults.error) {
    return
  }

  if (checkErrorTaskDataPut(res, req.body)) {
    return
  }

  req.body.radius = JSON.parse(req.body.radius)
  req.body.done = JSON.parse(req.body.done)
  req.body.enter = JSON.parse(req.body.enter)
  req.body.task_id = ObjectID(req.body.task_id)
  api.tasks.updateTask(db.get(), userID, ObjectID(req.params.taskID), req.body)
    .then(function(results) {
      if (results.result.nModified === 1) {
        res.json({ "success": "Task updated correctly."})
      } else if (results.result.n === 1) {
        res.json({ "error": "Task not updated."})
      } else {
        res.json({ "error": "User not found."})
      }
    }).catch(function(error) {
      res.json({
        "error": "Error updating task.",
        "message": error
      })
    })
})

/* Route to delete a task for a user */
router.delete('/:userID/:taskID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  api.tasks.deleteTask(db.get(), userID, ObjectID(req.params.taskID))
    .then(function(results){
      if (results.result.nModified === 1) {
        res.json({ "success": "Task deleted correctly."})
      } else if (results.result.n === 1) {
        res.json({ "error": "Task not deleted."})
      } else {
        res.json({ "error": "User not found."})
      }
    }).catch(function(error) {
      res.json({
        "error": "Error deleting task.",
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

function checkErrorTaskDataPost(res, data) {
  if (  typeof data.name === 'undefined' ||
        typeof data.lat === 'undefined' ||
        typeof data.long === 'undefined' ||
        typeof data.radius === 'undefined' ||
        typeof data.done === 'undefined' ||
        typeof data.enter === 'undefined') {
    res.json({
      "error": "Invalid POST format. See below for correct format.",
      "message": {
        "format": "Format must contain all fields as a JSON object.",
        "correct_format": {
          "name": "TASK NAME",
          "lat": "TASK LATITUDE",
          "long": "TASK LONGITUDE",
          "radius": 10,
          "done": true,
          "enter": false
        }
      }
    })
    return true
  }
  return false
}

function checkErrorTaskDataPut(res, data) {
  if (  typeof data.name === 'undefined' ||
        typeof data.lat === 'undefined' ||
        typeof data.long === 'undefined' ||
        typeof data.radius === 'undefined' ||
        typeof data.done === 'undefined' ||
        typeof data.enter === 'undefined' ||
        typeof data.task_id === 'undefined') {
    res.json({
      "error": "Invalid PUT format. See below for correct format.",
      "message": {
        "format": "Format must contain all fields as a JSON object.",
        "correct_format": {
          "name": "TASK NAME",
          "lat": "TASK LATITUDE",
          "long": "TASK LONGITUDE",
          "radius": 10,
          "done": true,
          "enter": false,
          "task_id": "56c3ac5320f2bbb6252eba67"
        }
      }
    })
    return true
  }
  return false
}
