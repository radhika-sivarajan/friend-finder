// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Creating an express server
var app = express();

// Set an initial port
var PORT = process.env.PORT || 3000;

// BodyParser makes it possible for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Serving static files in Express (path of static file sfolder)
app.use(express.static('app/public'));

// The below points our server to a series of "route" files.
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});