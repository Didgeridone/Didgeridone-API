var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var message = {
    hello: 'Welcome to the Didgeridone API!',
    message: 'Please use the documentation for correct API calls.',
    documentation: 'https://github.com/Didgeridone/api/blob/master/README.md'
  };

  res.json(message);
});

module.exports = router;
