require('dotenv').load()
var express = require('express')
var router = express.Router();
var mongodb = require('mongodb');
var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'

router.get('/', function(req, res){
  mongodb.MongoClient.connect(url, function(err, db){
    var tasks = db.collection('tasks');
    tasks.find().toArray(function(err, tasks){
      res.json(tasks)
    })
  })
})

router.post('/', function(req, res){
  console.log('post!')
})

router.put('/', function(req, res){
  console.log('put!')
})

router.delete('/', function(req, res){
  console.log('delete!')
})

module.exports = router;
