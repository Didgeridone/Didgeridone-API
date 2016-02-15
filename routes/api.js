require('dotenv').load()
var express = require('express')
var router = express.Router();
var mongodb = require('mongodb');
var url =  'mongodb://localhost/didgeridone'
//process.env.DATABASE_URL ||
var newTasks = [{
name: "Pet Dog",
lat: "lat",
long: "long",
radius: 11,
done: false,
enter: true
}]







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
  mongo.MongoClient.connect(url, function(err, db){
    var tasks = db.collection('tasks');
    tasks.updateOne(
      {_id: 2},
      {$push: {tasks.push}}
    )
  })
})

router.put('/task', function(req, res){
  console.log('put!')
  mongodb.MongoClient.connect(url, function(err, db){
    var tasks = db.collection('tasks');

    tasks.updateOne(
      {_id: 1},
      {$set: {tasks: newTasks}}
    )
    res.json('Success!')
  })
})

router.delete('/task', function(req, res){
  console.log('delete!')

})



module.exports = router;
