var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var searches = {};
 
app.use(express.static(path.join(__dirname, 'app')));
 
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Server istening on port " + port);
});