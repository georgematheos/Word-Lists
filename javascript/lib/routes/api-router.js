/**
* api-router.ts
*
* George Matheos
* gmatheos@exeter.edu
*
* A router for the /api route on the word-lists server.
* Note that the export is a function which takes an agrument.
* The argument is the directory of the 'routes' folder.
*/
"use strict";
var routers_dir; // this is set in the exports function; it is the path of the base 'routers' folder
// include express
var express = require('express');
// get the functions that return subrouters and the token verifyer
var getUsersRouter = require('./api-routes/users-router');
var getAuthenticateLocalRouter = require('./api-routes/authenticate-local-router');
var getWordListsRouter = require('./api-routes/word_lists-router');
var getVerifyToken = require('../verify-token');
// store the express router in a variable
var router = express.Router();
// how to route the root of this
router.get('/', function (req, res) {
    res.send('This is the /api route.\n');
});
module.exports = function (config) {
    // get the subrouters and the token verifyer from the functions that return them
    var users_router = getUsersRouter(config);
    var authenticate_local_router = getAuthenticateLocalRouter(config);
    var word_lists_router = getWordListsRouter(config);
    var verify_token = getVerifyToken(config);
    // use more specific path routers
    router.use('/users', users_router); // /api/users/ route
    router.use('/authenticate/local', authenticate_local_router); // /api/authenticate/local/ route
    router.use('/word_lists/:username', verify_token); // middleware to check for authentication on the /api/word_lists/:username/ route
    router.use('/word_lists/', word_lists_router); // /api/word_lists/:username/ route
    router.get('/word_lists/', function (req, res) {
        res.send('This it the word_lists route!\n');
    });
    // return the router now that the other routes have been added to it
    return router;
};
//# sourceMappingURL=api-router.js.map