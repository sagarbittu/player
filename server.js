var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var path = require('path');
var request = require('request');

app.use(express.static(__dirname+'/public'));
//app.use(express.static(path.join(global.__dirname, 'public')));
app.use(bodyparser.json());

app.listen(3000, function() {
	console.log("Server running on port 3000");
});

require('./routes.js')(app);

module.exports = app;