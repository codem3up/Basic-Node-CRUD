var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ws = require("nodejs-websocket");


var mongoose = require('mongoose');

var db = require('./config/db');

mongoose.connect(db.url);

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded( {extended: true }));

app.use(methodOverride('X-HTTP-METHOD-Override'));

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

ws.myConnections = [];

require('./app/websocket')(ws)

app.listen(port);

console.log('Node listening on port ' + port);

exports = module.exports = app;