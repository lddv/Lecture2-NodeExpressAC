var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var dogRoute = require('./dogRoute');
var goodDogRoute = require('./goodDogRoute');
var wiggleRoute = require('./wiggleRoute');
var loginRoute = require('./loginRoute');

app.use(cookieParser());

app.use('/dog', dogRoute);
app.use('/goodDog', goodDogRoute);
app.use('/wiggle', wiggleRoute);
app.use('/login', loginRoute);

module.exports = {
  makeServer: function(done){
    var server = app.listen(8080, function(){

      console.log('Listening on port 8080...');
      if(done) done();
    });

    return server;
  }
};