/**
* verify-token.ts
*
* George Matheos
* gmatheos@exeter.edu
*
* Express middleware that authenticates a token.  Must be on a route with a 'username' parameter in the url.
*/
"use strict";
var jwt = require('jsonwebtoken');
module.exports = function (config) {
    return function (req, res, next) {
        // get the token from the request
        var token = req.headers['x-auth-token'] || req.body.token || req.query.token || req.headers['x-access-token'];
        // if not token is provided, send an error
        if (!token) {
            res.status(401).json({ error: 'Unauthorized', message: 'a token must be provided to demonstrate authentication' });
            return;
        }
        jwt.verify(token, config.token_secret, function (err, decoded) {
            if (err) {
                res.status(401).json({ error: 'Unauthorized', message: 'failed to authenticate token' });
                return;
            }
            // make sure that this is a token for the correct user
            if (decoded.username !== req.params.username) {
                res.status(401).json({ error: 'Unauthorized', message: 'the token provided is not for the user specified in the url', username: req.params.username });
                return;
            }
            // save the decoded payload for any other middleware/routes to use
            req.token_payload = decoded;
            // run the next middeware function or route handler
            next();
        });
    };
};
//# sourceMappingURL=verify-token.js.map