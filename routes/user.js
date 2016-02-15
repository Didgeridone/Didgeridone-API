require('dotenv').load()
var api = require('../db/api')
var express = require('express')
var router = express.Router()
var mongodb = require('mongodb').MongoClient
var objectId = require('mongodb').ObjectID
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'

router.get('/:userID', function(req, res) {
  mongodb.connect(url, function(err, db) {
    var tasks = db.collection('tasks')
    tasks.find().toArray(function(err, tasks) {
      res.json(tasks)
    })
    db.close()
  })
})

router.post('/', function(req, res) {
  console.log('post!')
})

router.put('/:userID', function(req, res) {
  console.log('put!')
})

router.delete('/:userID', function(req, res) {
  console.log('delete!')
})

module.exports = router;
