var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
require('dotenv').load()


var data = {
  key1: 'Stuff',
  key2: 'More stuff'
}



router.get('/', function(req, res){
  mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/didgeridone')
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    console.log('open')
    var taskSchema = mongoose.Schema({
      _id: Number,
      data: String
    })
    var Task = mongoose.model('Task', taskSchema)
    Task.find(function(err, tasks){
      res.json(tasks)
    })

  })



})

module.exports = router;
