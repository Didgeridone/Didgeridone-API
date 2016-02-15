require('dotenv').load()
var api = require('../db/api')
var express = require('express')
var router = express.Router()
var mongodb = require('mongodb').MongoClient
var objectID = require('mongodb').ObjectID
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'

router.get('/:userID', function(req, res) {
  mongodb.connect(url, function(err, db) {
    var users = db.collection('users')
    users.find({"_id": objectID(req.params.userID)}).toArray(function(err, user) {
      res.json(user)
    })
    // db.close()
  })
})

router.post('/:userID', function(req, res) {
  console.log('post!')
})

router.put('/:userID/:taskID', function(req, res) {
  console.log('put!')
})

router.delete('/:userID/:taskID', function(req, res) {
  console.log('delete!')
})

module.exports = router;
