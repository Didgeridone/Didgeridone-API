require('dotenv').load()
var api = require('../db/api')
var express = require('express')
var router = express.Router()
var mongodb = require('mongodb').MongoClient
var objectId = require('mongodb').ObjectID
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'

router.get('/:userID', function(req, res) {
  //do error testing to make sure user id is specified
  mongodb.connect(url, function(err, db) {
    api.users.getUser(db, req.params.userID).then(function(results) {
      res.json(results)
      db.close()
    })
  })
})

router.post('/', function(req, res) {
  //do error testing on req.body to make sure all fields are good
  mongodb.connect(url, function(err, db) {
    api.users.createUser(db, req.body).then(function(results) {
      res.json(results.ops)
      db.close()
    })
  })
})

router.put('/:userID', function(req, res) {
  console.log('put!')
})

router.delete('/:userID', function(req, res) {
  console.log('delete!')
})

module.exports = router;
