/**
* word_lists-router.js
*
* George Matheos
* gmatheos@exeter.edu
*
* A router for the /api/word_lists/ route on the word-lists server.
* Note that it is assumed that any request sent to this router has already been given authentication.
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
    // verification message
    router.get('/', function(req, res) {
        res.send('This is the /api/word_lists/ route.\n');
    });

    // CREATE WORD LIST
    router.post('/:username/', function(req, res) {
        // make sure proper fields are in body
        if (!req.body.title) {
            res.status(400).json({ error: 'Bad Request', message: 'no title provided in request body' });
            return;
        }
        if (!req.body.words) {
            res.status(400).json({ error: 'Bad Request', message: 'no words array provided in request body' });
            return;
        }

        // connect to mongodb database
        MongoClient.connect(config.db_url, function(err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                db.close();
                return;
            }

            // check if a list with this title already exists for the user
            db.collection(config.word_lists_collection_name).find({ username: req.params.username, title: req.body.title }).toArray(function(err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }

                // if there is a list with the title, refuse to create a new one
                if (documents.length > 0) {
                    res.status(409).json({ error: 'Conflict', message: 'word list with this title already exists', username: req.body.username });
                    db.close();
                    return;
                }

                // create the record
                db.collection(config.word_lists_collection_name).insertOne({
                    username: req.params.username,
                    title: req.body.title,
                    words: req.body.words,
                    dateTimeCreated: new Date(),
                    dateTimeLastModified: new Date()
                }, function(err, result) {
                    if (err) {
                        res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                        db.close();
                        return;
                    }

                    res.status(201).json({ success: true, message: 'word list created', username: req.params.username, title: req.body.title });
                    db.close();
                });
            });
        });
    });

    // RETRIEVE ALL WORD LISTS FOR A USER
    router.get('/:username/', function(req, res) {
        // connect to mongodb database
        MongoClient.connect(config.db_url, function(err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                db.close();
                return;
            }

            // get word lists created by the given user
            db.collection(config.word_lists_collection_name).find({ username: req.params.username }).toArray(function(err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }

                // create a list of the titles of the word lists
                let titles = [];
                documents.forEach(function(document, index) {
                    titles[index] = document.title;
                });

                res.status(200).json({ 'word-lists': titles, username: req.params.username });
                db.close();
            });
        });
    });

    // RETRIEVE WORD LIST
    router.get('/:username/:title/', function(req, res) {
        // connect to mongodb database
        MongoClient.connect(config.db_url, function(err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                db.close();
                return;
            }

            // get the word list with that name
            db.collection(config.word_lists_collection_name).find({ username: req.params.username, title: req.params.title }).toArray(function(err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }

                // make sure exactly 1 word list was found
                if (documents.length < 1) {
                    res.status(404).json({ error: 'Not Found', message: 'no word list found with the given title belonging to the user with the given username', username: req.params.username, title: req.params.title });
                    db.close();
                    return;
                }
                if (documents.length > 1) {
                    res.status(500).json({ error: 'Internal Server Error', message: 'it seems that more than one word list exists with the given title created by the user with the given username; contact the server administrator to try to resolve this issue', username: req.params.username, title: req.params.title });
                    db.close();
                    return;
                }

                // send the word list
                let word_list = documents[0];
                delete word_list._id;
                res.status(200).json(word_list);
                db.close();
            });
        });
    });

    // DELETE WORD LIST
    router.delete('/:username/:title/', function(req, res) {
        // connect to mongodb database
        MongoClient.connect(config.db_url, function(err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                db.close();
                return;
            }

            // get the word list with that name
            db.collection(config.word_lists_collection_name).find({ username: req.params.username, title: req.params.title }).toArray(function(err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }

                // make sure exactly 1 word list was found
                if (documents.length < 1) {
                    res.status(404).json({ error: 'Not Found', message: 'no word list found with the given title belonging to the user with the given username', username: req.params.username, title: req.params.title });
                    db.close();
                    return;
                }
                if (documents.length > 1) {
                    res.status(500).json({ error: 'Internal Server Error', message: 'it seems that more than one word list exists with the given title created by the user with the given username; contact the server administrator to try to resolve this issue', username: req.params.username, title: req.params.title });
                    db.close();
                    return;
                }

                // delete the list
                db.collection(config.word_lists_collection_name).deleteOne({ username: req.params.username, title: req.params.title }, function(err, results) {
                    if (err) {
                        res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                        db.close();
                        return;
                    }

                    res.status(200).json({ message: 'word list deleted', username: req.params.username, title: req.params.title });
                    db.close();

                });
            });
        });
    });

    // MODIFY WORD LIST
    router.put('/:username/:title/', function(req, res) {
        // if a title or words field is not included in the body, return an error
        if (!req.body.title) {
            res.status(400).json({ error: 'Bad Request', message: 'no title provided in request body' });
            return;
        }
        if (!req.body.words) {
            res.status(400).json({ error: 'Bad Request', message: 'no words array provided in request body' });
            return;
        }

        // connect to mongodb database
        MongoClient.connect(config.db_url, function(err, db) {
            if (err) {
                res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                db.close();
                return;
            }

            // get the word list with that name
            db.collection(config.word_lists_collection_name).find({ username: req.params.username, title: req.params.title }).toArray(function(err, documents) {
                if (err) {
                    res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                    db.close();
                    return;
                }

                // make sure exactly 1 word list was found
                if (documents.length < 1) {
                    res.status(404).json({ error: 'Not Found', message: 'no word list found with the given title belonging to the user with the given username', username: req.params.username, title: req.params.title });
                    db.close();
                    return;
                }
                if (documents.length > 1) {
                    res.status(500).json({ error: 'Internal Server Error', message: 'it seems that more than one word list exists with the given title created by the user with the given username; contact the server administrator to try to resolve this issue', username: req.params.username, title: req.params.title });
                    db.close();
                    return;
                }

                // get the current document for this word list
                let current_list = documents[0];

                // check if the new title is already in use
                db.collection(config.word_lists_collection_name).find({ username: req.params.username, title: req.body.title }).toArray(function(err, documents) {
                    // if the title was changed and the new title is in use, return an error
                    if (req.body.title !== req.params.title && documents.length > 0) {
                        res.status(409).json({ error: 'Conflict', message: 'word list with this title already exists', username: req.body.username });
                        db.close();
                        return;
                    }

                    // replace the file with the new information
                    db.collection(config.word_lists_collection_name).replaceOne({ username: req.params.username, title: req.params.title }, {
                        username: req.params.username,
                        title: req.body.title,
                        words: req.body.words,
                        dateTimeCreated: current_list.dateTimeCreated,
                        dateTimeLastModified: new Date()
                    }, function(err, results) {
                        if (err) {
                            res.status(502).json({ error: 'Bad Gateway', reason: err.message });
                            db.close();
                            return;
                        }

                        res.status(200).json({ success: true, message: 'word list modified', username: req.params.username, title: req.body.title });
                        db.close();
                    });
                });
            });
        });
    });

    // return the router
    return router;

};
