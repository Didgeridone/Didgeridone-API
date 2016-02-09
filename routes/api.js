var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
require('dotenv').load()

mongoose.connect(process.env.DATABASE_URL)
var taskSchema = mongoose.Schema({
  _id: Number,
  data: String
})


router.get('/', function(req, res){
  var db = mongoose.createConnection(process.env.DATABASE_URL);

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(){
    console.log('open')

    var Task = mongoose.model('Task', taskSchema)
    Task.find(function(err, tasks){
      res.json(tasks)
    })

  })



})

module.exports = router;
