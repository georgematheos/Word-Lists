/**
* server.ts
*
* George Matheos
* gmatheos@exeter.edu
*
* The server for word-lists web app.
*/
"use strict";
console.log('Server started.\n');
// include external dependencies
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// get the config object from the json file
var config = JSON.parse(fs.readFileSync(__dirname + '/../config.json').toString()); // use sync since this must be done before the main server loop
config.root_dir = __dirname + '/../'; // add the property of the root server directory to the config
// get the list of node_modules packages the server is permitted to serve
var servable_packages = JSON.parse(fs.readFileSync(__dirname + '/../servable-packages.json').toString()).packages;
// include project-specific dependencies
var routerReturner = require('./lib/routes/api-router');
var api_router = routerReturner(config); // requring the api_router file returns a function which is called, passing in the argument of the routes directory
// create the express app for the server
var app = express();
// use the following middleware
app.use(morgan('dev')); // logger for the server
app.use(bodyParser.json()); // json reader for body
// use the api router
app.use('/api', api_router);
// route requests for static files to the public folder
app.use(express.static(__dirname + '/public'));
// for each package in node_modules specified in the servable-packages.json file, tell express to serve it
servable_packages.forEach(function (pkgName) {
    app.use('/node_modules/' + pkgName, express.static(__dirname + '/../node_modules/' + pkgName));
});
// finally, if none of those worked, just send the index.html file and let angular handle the routing
app.use(function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
// have the express app listen
var port = (process.argv.length > 2) ? process.argv[2] : config.default_port; // port to be used
app.listen(port, function () {
    console.log('Ready to go!  Listening on port ' + port + '.\n');
});
//# sourceMappingURL=server.js.map