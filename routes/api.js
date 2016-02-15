require('dotenv').load()
var express = require('express')
var router = express.Router();
var mongodb = require('mongodb');
var url =  'mongodb://localhost/didgeridone'
//process.env.DATABASE_URL ||
router.get('/task', function(req, res){
  mongodb.MongoClient.connect(url, function(err, db){
    var tasks = db.collection('tasks');
    tasks.find().toArray(function(err, tasks){
      res.json(tasks)
    })
  })
})

router.post('/task', function(req, res){
  console.log('post!')
})

router.put('/task/task_id', function(req, res){
  console.log('put!')
})

router.delete('/task/task_id', function(req, res){
  console.log('delete!')
})



module.exports = router;
