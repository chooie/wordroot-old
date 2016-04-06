// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var db = require("./db");

  var Q = require("q");

  function connectToDB() {
    var connection = db.createConnection({
      host: "localhost",
      user: "root",
      database: "wordroot"
    });
    connection.connect();
    return connection;
  }

  var registerRoutes = function(app) {
    app.get("/test-db", function(req, res) {
      var connection = connectToDB();

      connection.query('SELECT 1 + 1 AS solution', function(err, rows
                                                            /*fields*/) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
        res.send("Solution: " + rows[0].solution);
      });

      connection.end();
    });

    app.get("/words", function(req, res) {
      var connection = connectToDB();

      connection.query("SELECT word FROM words", function(err, rows) {
        if (err) throw err;

        var words = [];

        rows.forEach(function(row) {
          words.push(row.queryWordInfo);
        });

        res.send(words);
      });
    });

    app.get("/word/:word", function(req, res) {
      var connection = connectToDB();
      queryWordInfo(req, connection)
      .then(function(wordObj) {
        return queryWordParts(connection, wordObj);
      })
      .then(function(wordObj) {
        return queryRootIds(connection, wordObj);
      })
      .then(function(wordObj) {
        return queryRoots(connection, wordObj);
      })
      .then(function(wordObj) {
        return queryLanguages(connection, wordObj);
      })
      .then(function(wordObj) {
        res.send(prepareWordInfo(wordObj));
      })
      .fail(function(err) {
        throw err;
      });
    });

    function queryWordInfo(req, connection) {
      var deferred = Q.defer();
      var word = req.params.word;
      word = connection.escape(word);

      connection.query("SELECT * FROM words " +
        "WHERE word = " + word, function(err, rows) {
        if (err) deferred.reject(err);
        deferred.resolve(rows[0]);
      });

      return deferred.promise;
    }
  };

  function queryWordParts(connection, wordObj) {
    var deferred = Q.defer();
    var id = connection.escape(wordObj.id);
    connection.query("SELECT id, part FROM word_parts " +
      "WHERE word_id = " + id + " " +
      "ORDER BY position_index", function(err, parts) {
      wordObj.parts = parts;
      deferred.resolve(wordObj);
    });
    return deferred.promise;
  }

  function queryRootIds(connection, wordObj) {
    var deferred = Q.defer();

    var rootQueryPromises = [];

    wordObj.parts.forEach(function(part) {
      var promise = Q.Promise(function(resolve, reject) {
        connection.query("SELECT * FROM word_parts_roots " +
          "WHERE word_part_id = " + part.id, function(err, rootId) {
          if (err) reject(err);
          if (!rootId[0]) {
            resolve(null);
          } else {
            resolve(rootId[0]);
          }
        });
      });
      rootQueryPromises.push(promise);
    });

    Q.all(rootQueryPromises).then(function(roots) {
      wordObj.rootIds = roots;
      deferred.resolve(wordObj);
    });

    return deferred.promise;
  }

  function queryRoots(connection, wordObj) {
    var deferred = Q.defer();

    var rootQueryPromises = [];
    wordObj.rootIds.forEach(function(rootId) {
      var promise = Q.Promise(function(resolve, reject) {
        if (!rootId) return resolve(null);
        connection.query("SELECT * FROM roots " +
          "WHERE id = " + rootId.root_id, function(err, root) {
          if (err) {
            reject(err);
          }
          if (!root[0]) {
            resolve(null);
          } else {
            resolve(root[0]);
          }
        });
      });
      rootQueryPromises.push(promise);
    });

    Q.all(rootQueryPromises)
      .then(function(roots) {
        wordObj.roots = roots;
        deferred.resolve(wordObj);
      });

    return deferred.promise;
  }

  function queryLanguages(connection, wordObj) {
    var deferred = Q.defer();
    var languageQueryPromises = [];
    wordObj.roots.forEach(function(root) {
      var promise = Q.Promise(function(resolve, reject) {
        if (!root) return resolve(null);
        connection.query("SELECT * FROM languages " +
          "WHERE id = " + root.language_id, function(err, language) {
          if (err) {
            reject(err);
          }
          if (!language[0]) {
            resolve(null);
          } else {
            resolve(language[0].name);
          }
        });
      });
      languageQueryPromises.push(promise);
    });

    Q.all(languageQueryPromises)
      .then(function(languages) {
        wordObj.languages = languages;
        deferred.resolve(wordObj);
      });

    return deferred.promise;
  }

  function prepareWordInfo(wordObj) {
    try {
      var preparedWord = {};
      preparedWord.word = wordObj.word;
      preparedWord.meaning = wordObj.meaning;
      preparedWord.roots = [];
      wordObj.parts.forEach(function(part, i) {
        var rootEntry = { part: part.part };
        var root = wordObj.roots[i];
        if (root) {
          rootEntry.root = {
            word: wordObj.roots[i].word,
            meaning: wordObj.roots[i].meaning,
            language: wordObj.languages[i]
          };
        }
        preparedWord.roots.push(rootEntry);
      });
      return preparedWord;
    } catch(err) {
      console.log(err);
    }
  }

  module.exports = {
    registerRoutes: registerRoutes
  };

}());
