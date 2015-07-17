var express = require('express');
var router = express.Router();
var dogs = require('./dogs');
var auth = require('./auth');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

router.route('/')
  .post(parseUrlencoded, function(request, response){
    var data = request.body;

    if(data && data.doggyId && data.doggyId < dogs.length) {
      var dog = dogs[data.doggyId];
      var payload = {name: dog.getName(), id: data.doggyId};
      var token = auth.signToken(payload);
      response.status(200).json(token);
    }else{
      response.sendStatus(403);
    }
  });

module.exports = router;