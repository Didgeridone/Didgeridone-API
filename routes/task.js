require('dotenv').load()
var api = require('../db/api')
var express = require('express')
var router = express.Router()
var mongodb = require('mongodb').MongoClient
var objectID = require('mongodb').ObjectID
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'

router.get('/:userID', function(req, res) {
  mongodb.connect(url, function(err, db) {
    api.tasks.getTasks(db, req.params.userID).then(function(results){
      res.json(results)
      db.close();
    })
  })
})

router.post('/:userID', function(req, res) {
  mongo.MongoClient.connect(url, function(err, db){
    api.tasks.createTask(db, req.params.userID, req.body).then(function(results){
      res.json(results.ops)
      db.close();
    })
  })
})

router.put('/:userID/:taskID', function(req, res) {
  mongodb.MongoClient.connect(url, function(err, db){
    api.tasks.updateTask(db, req.params.userID, req.body).then(function(results){
      res.json(results)
      db.close();
    })
  })
})

router.delete('/:userID/:taskID', function(req, res) {
  mongodb.MongoClient.connect(url, function(err, db){
    api.tasks.deleteTask(db, req.params.userID, req.body).then(function(results){
      res.json(results)
      db.close();
    })
  })
})

module.exports = router;
