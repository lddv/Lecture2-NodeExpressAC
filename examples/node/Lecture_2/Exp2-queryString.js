var express = require('express');
var app = express();

app.get('/', function(request, response) {
  var msgStrings = ['First String', 'Second String'];
  var messageIndex = request.query.index;
  if(messageIndex && messageIndex < msgStrings.length) {
    response.send(msgStrings[messageIndex]);
  } else {
    response.sendStatus(403);
  }
});

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});
