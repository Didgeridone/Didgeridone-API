require('dotenv').load()
var api = require('../db/api')
var express = require('express')
var router = express.Router()
var mongodb = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'

/* Route to retrieve information for a user's task */
router.get('/:userID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  mongodb.connect(url, function(err, db) {
    api.tasks.getTasks(db, userID).then(function(results){
      if (results.length < 1) {
        res.json({ "error": "Could not find user" })
      } else {
        res.json({ "user": {
          "_id": results[0]._id,
          "tasks": results[0].tasks
        }})
      }
      db.close();
    }).catch(function(error) {
      res.json({
        "error": "Error locating task.",
        "message": error
      })
      db.close()
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

  if (checkErrorTaskData(res, req.body)) {
    return
  }

  mongodb.connect(url, function(err, db){
    req.body.radius = JSON.parse(req.body.radius)
    req.body.done = JSON.parse(req.body.done)
    req.body.enter = JSON.parse(req.body.enter)
    api.tasks.getTaskCount(db, userID).then(function(results) {
      req.body.task_id = results[0].count + 1
      api.tasks.createTask(db, userID, req.body).then(function(results) {
        if (results.result.nModified === 1) {
          res.json({ "new_task": req.body })
        } else if (results.result.n === 0) {
          res.json({ "error": "User not found. Task could not be created." })
        } else {
          res.json({ "error": "Task was not created correctly." })
        }
        db.close();
      })
    }).catch(function(error) {
      res.json({
        "error": "Error creating task.",
        "message": error
      })
      db.close()
    })
  })
})

/* Route to update a task for a user */
router.put('/:userID/:taskID', function(req, res) {
  var results = testUserID(res, req.params.userID)
  var userID = results.userID
  if (results.error) {
    return
  }

  if (checkErrorTaskData(res, req.body)) {
    return
  }

  mongodb.connect(url, function(err, db){
    req.body.radius = JSON.parse(req.body.radius)
    req.body.done = JSON.parse(req.body.done)
    req.body.enter = JSON.parse(req.body.enter)
    api.tasks.updateTask(db, userID, req.params.taskID, req.body).then(function(results){
      if (results.result.nModified === 1) {
        res.json({ "success": "Task updated correctly."})
      } else if (results.result.n === 1) {
        res.json({ "error": "Task not updated."})
      } else {
        res.json({ "error": "User not found."})
      }
      db.close();
    }).catch(function(error) {
      res.json({
        "error": "Error updating task.",
        "message": error
      })
      db.close()
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

  mongodb.connect(url, function(err, db){
    api.tasks.deleteTask(db, userID, req.params.taskID).then(function(results){
      if (results.result.nModified === 1) {
        res.json({ "success": "Task deleted correctly."})
      } else if (results.result.n === 1) {
        res.json({ "error": "Task not deleted."})
      } else {
        res.json({ "error": "User not found."})
      }
      db.close();
    }).catch(function(error) {
      res.json({
        "error": "Error deleting task.",
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

function checkErrorTaskData(res, data) {
  console.log(data);
  console.log(!data.name);
  console.log(!data.lat);
  console.log(!data.long);
  console.log(!data.radius);
  console.log(typeof data.done);
  console.log(typeof data.enter);

  if (  typeof data.name === 'undefined' ||
        typeof data.lat === 'undefined' ||
        typeof data.long === 'undefined' ||
        typeof data.radius === 'undefined' ||
        typeof data.done === 'undefined' ||
        typeof data.enter === 'undefined') {
    res.json({
      "error": "Invalid PUT or POST format. See below for correct format.",
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
