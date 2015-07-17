var express = require('express');
var router = express.Router();
var dogs = require('./dogs');

router.route('/:doggyId')
  .get(function(request, response) {
    var doggyIndex = request.params.doggyId;
    if(doggyIndex && doggyIndex < dogs.length) {
      response.json(dogs[doggyIndex].whoIsAGoodBoy());
    }
  });

module.exports = router;
