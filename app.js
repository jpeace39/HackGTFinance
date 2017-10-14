const express = require('express');
const path = require('path');
var app = express();

var port = Number(process.env.PORT || 8080);

app.use('/public', express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/views/main.html'));
});

app.listen(port);
