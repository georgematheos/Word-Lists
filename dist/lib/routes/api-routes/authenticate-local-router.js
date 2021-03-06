/**
* authenticate-local-router.ts
*
* George Matheos
* gmatheos@exeter.edu
*
* A router for the /api/authenticate/local/ route on the word-lists server.
*/
"use strict";
// include dependencies
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var mongodb_1 = require('mongodb');
// store the express router in a variable
var router = express.Router();
module.exports = function (config) {
    // verification message
    router.get('/', function (req, res) {
        res.send('This is the /api/authenticate/local/ route.\n');
    });
    // AUTHENTICATE USER
    router.post('/', function (req, res) {
        // connect to the mongodb database
        mongodb_1.MongoClient.connect(config.db_url, function (err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                return;
            }
            // send an error message if no username or no password is provided
            if (!req.body.username) {
                res.status(400).json({ error: 'Bad Request', message: 'no username provided in request body' });
                db.close();
                return;
            }
            if (!req.body.password) {
                res.status(400).json({ error: 'Bad Request', message: 'no password provided in request body', username: req.body.username });
                db.close();
                return;
            }
            // check if a user with given username exists
            db.collection(config.users_collection_name).find({ username: req.body.username }).toArray(function (err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }
                // return an error if there is not exactly one user with the username
                if (documents.length < 1) {
                    res.status(404).json({ error: 'Not Found', message: 'no user with given username exists', username: req.body.username });
                    db.close();
                    return;
                }
                if (documents.length > 1) {
                    res.status(500).json({ error: 'Internal Server Error', message: 'it seems that more than one user exists with the given username; contact the server administrator to try to resolve this issue', username: req.body.username });
                    db.close();
                    return;
                }
                // get the user
                var user = documents[0];
                bcrypt.compare(req.body.password, user.pass_hash, function (err, match) {
                    // if the password does not match, return an error
                    if (!match) {
                        res.status(401).json({ error: 'Unauthorized', message: 'password does not match the one on file', username: req.body.username });
                        db.close();
                        return;
                    }
                    // create the payload for the token
                    var payload = {
                        iss: config.website_name,
                        username: req.body.username
                    };
                    var options = {
                        expiresIn: config.time_until_token_expiration
                    };
                    // create a token and send it to the user
                    var token = jwt.sign(payload, config.token_secret, options, function (err, token) {
                        if (err) {
                            res.status(500).json({ error: 'Internal Server Error', message: 'error generating token', username: req.body.username });
                            db.close();
                            return;
                        }
                        // when the token will expire
                        var exp_date = new Date();
                        exp_date.setSeconds(exp_date.getSeconds() + config.time_until_token_expiration);
                        res.status(200).json({ message: 'here is a token', token: token, exp: exp_date });
                        db.close();
                    });
                });
            });
        });
    });
    // CHECK TOKEN VALIDITY
    router.get('/check_validity/:token', function (req, res) {
        jwt.verify(req.params.token, config.token_secret, function (err, decoded) {
            if (err) {
                res.status(401).json({ error: 'Unauthorized', message: 'failed to authenticate token' });
                return;
            }
            // otherwise, it is valid, so send a 200 status code and we're done!
            res.status(200).end();
        });
    });
    // REFRESH TOKEN
    router.get('/refresh_token/:token', function (req, res) {
        jwt.verify(req.params.token, config.token_secret, function (err, decoded) {
            if (err) {
                res.status(401).json({ error: 'Unauthorized', message: 'failed to authenticate token' });
                return;
            }
            // create the payload for the token
            var payload = decoded; // reuse the payload
            delete payload.exp; // remove the exp date from the payload
            var options = {
                expiresIn: config.time_until_token_expiration
            };
            // create a token and send it to the user
            var token = jwt.sign(payload, config.token_secret, options, function (err, token) {
                if (err) {
                    res.status(500).json({ error: 'Internal Server Error', message: 'error generating token', username: req.body.username });
                    return;
                }
                var exp_date = new Date();
                exp_date.setSeconds(exp_date.getSeconds() + config.time_until_token_expiration);
                res.status(200).json({ message: 'here is a new token', token: token, exp: exp_date });
            });
        });
    });
    // return the router
    return router;
};
//# sourceMappingURL=authenticate-local-router.js.map