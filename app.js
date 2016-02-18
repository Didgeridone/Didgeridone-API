require('dotenv').load()
var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
var db = require('./db/dbconnect')

var home = require('./routes/home')
var task = require('./routes/task')
var user = require('./routes/user')
var auth= require('./routes/auth')

var app = express()

var url = process.env.DATABASE_URL || 'mongodb://localhost/didgeridone'
db.connect(url, function(err) {
  if (err) {
    console.log('Error connecting to MongoDB')
    process.exit(1)
  }
})

app.set('json spaces', 2)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
  origin: ["https://didgeridone.firebaseapp.com", process.env.CLIENT_HOST],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}
))

app.use(auth.passport.initialize())
app.use(auth.authenticate)

app.use('/', home)
app.use('/task', task)
app.use('/user', user)
app.use('/auth', auth.router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.toString(),
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.toString(),
    error: err
  })
})

module.exports = app
