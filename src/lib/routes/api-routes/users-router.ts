/**
* api-router.js
*
* George Matheos
* gmatheos@exeter.edi
*
* A router for the /api/users/ route on the word-lists server.
*/

// include dependencies
import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

// store the express router in a variable
const router = express.Router();

// export the router-returning function
export = function(config) {
    // handle different routes:

    // verification message
    router.get('/', function(req, res) {
        res.send('This is the /api/users/ route.\n');
    });

    // CREATE USER
    router.post('/', function(req, res) {
        // send an error message if no username is provided
        if (!req.body.username) {
            res.status(400).json({ error: 'Bad Request', message: 'no username provided in request body' });
            return;
        }
        // send an error message if no password is provided
        if (!req.body.password) {
            res.status(400).json({ error: 'Bad Request', message: 'no password provided in request body', username: req.body.username });
            return;
        }

        // connect to the mongodb database
        MongoClient.connect(config.db_url, function(err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                db.close();
                return;
            }

            // check if a user with given username exists
            db.collection(config.users_collection_name).find({ username: req.body.username }).toArray(function(err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }

                // return an error if a user with the username does exist
                if (documents.length !== 0) {
                    res.status(409).json({ error: 'Conflict', message: 'user with username already exists', username: req.body.username });
                    db.close();
                    return;
                }

                // hash the password using bcrypt
                bcrypt.hash(req.body.password, config.salt_rounds, function(err, hash) {
                    if (err) {
                        res.status(500).json({ error: 'Internal Server Error', message: 'error creating password hash', username: req.body.username });
                        db.close();
                        return;
                    }

                    // create the user
                    db.collection(config.users_collection_name).insertOne({
                        username: req.body.username,
                        pass_hash: hash,
                        dateTimeCreated: new Date(),
                        dateTimeLastModified: new Date()
                    }, function(err, result) {
                        if (err) {
                            res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                            db.close();
                            return;
                        }

                        res.status(201).json({ success: true, message: 'user created', username: req.params.username });
                        db.close();
                    });

                });

            });
        });
    });

    // MODIFY USER DATA
    router.put('/:username', function(req, res) {
        // make sure a password was provided
        if (!req.body.password) {
            res.status(400).json({ error: 'Bad Request', message: 'no password provided in request body', username: req.params.username });
            return;
        }

        // connect to the database
        MongoClient.connect(config.db_url, function(err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                db.close();
                return;
            }

            // get user data for the given username
            db.collection(config.users_collection_name).find({ username: req.params.username }).toArray(function(err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }

                // make sure exactly one user exists with the given username
                if (documents.length === 0) {
                    res.status(404).json({ error: 'Not Found', message: 'no user with the given username exists', username: req.params.username });
                    db.close();
                    return;
                }
                if (documents.length > 1) {
                    res.status(500).json({ error: 'Internal Server Error', message: 'it seems that more than one user exists with the given username; contact the server administrator to try to resolve this issue', username: req.params.username });
                    db.close();
                    return;
                }

                let user = documents[0]; // get the user

                // verify the password
                bcrypt.compare(req.body.password, user.pass_hash, function(err, match) {
                    if (err) {
                        res.status(500).json({ error: 'Internal Server Error', message: 'error comparing password to hashed password on file', username: req.body.username });
                        db.close();
                        return;

                    }

                    // if the passcode given does not match, refuse to modify account
                    if (!match) {
                        res.status(401).json({ error: 'Unauthorized', message: 'password provided does not match the one on file', username: req.params.username });
                        db.close();
                        return;
                    }

                    // update the user's password if applicable
                    if (req.body.new_password) {

                        // hash the new password using bcrypt
                        bcrypt.hash(req.body.new_password, config.salt_rounds, function(err, hash) {
                            if (err) {
                                res.status(500).json({ error: 'Internal Server Error', message: 'error creating password hash', username: req.body.username });
                                db.close();
                                return;
                            }

                            // update the database with the new password hash
                            db.collection(config.users_collection_name).updateOne({ username: req.params.username }, {
                                $set: { pass_hash: hash, dateTimeLastModified: new Date() }
                            },
                                function(err, results) {
                                    if (err) {
                                        res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                                        return;
                                    }
                                    res.status(200).json({ success: true, message: 'password succesfully changed', username: req.body.username });
                                    db.close();
                                });
                        });
                    }
                    // if nothing was changed, send a message ackgnowledging that
                    else {
                        res.status(200).json({ message: "nothing changed; no changes were specified", username: req.body.new_password });
                        db.close();
                    }
                });
            });
        });
    });


    // return the router
    return router;

};
