var express = require('express');
var app = express();

// Exercise 1:
// Create a Express server that respond with 'Hello World' if I try to reach it.
app.get('/', function(request, response){
  response.send("Hello World!");
});

app.listen(8989, function(){
  console.log('Listening on port 8989...');
});
