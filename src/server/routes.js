// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var db = require("./db");

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
          words.push(row.word);
        });

        res.send(words);
      });
    });

    app.get("/word/:word", function(req, res) {
      var connection = connectToDB();
      var word = req.params.word;

      word = connection.escape(word);

      connection.query("SELECT * FROM words " +
        "WHERE word = " + word, function(err, rows) {
        if (err) throw err;

        var wordObj = rows[0];

        var wordId = connection.escape(wordObj.id);

        connection.query("SELECT id, part FROM word_parts " +
          "WHERE word_id = " + wordId + " " +
          "ORDER BY position_index", function(err, wordParts) {

          var parts = [];
          var rootIds = [];
          var roots = [];
          wordParts.forEach(function(wordPart, i) {
            parts.push(wordPart.part);

            connection.query("SELECT root_id FROM word_parts_roots " +
              "WHERE word_part_id = " + wordPart.id, function(err, rootId) {
              rootIds.push(rootId[0] && rootId[0].root_id);

              if (i === wordParts.length - 1) {
                rootIds.forEach(function(rootId, j) {
                  connection.query("SELECT * FROM roots " +
                    "WHERE id = " + rootId, function(err, root) {
                    roots.push(root && root[0]);

                    if (j === rootIds.length - 1) {
                      var languages = [];
                      roots.forEach(function(root, i) {
                        connection.query("SELECT name FROM languages " +
                          "WHERE id = " +
                          root.language_id, function(err, lang) {
                          languages.push(lang[0].name);

                          if (i === roots.length - 1) {
                            roots.forEach(function(root, i) {
                              roots[i] = {
                                word: root.word,
                                meaning: root.meaning,
                                language: languages[i]
                              };
                            });
                            wordObj.roots = [];
                            parts.forEach(function(part, i) {
                              wordObj.roots[i] = {
                                part: parts[i],
                                root: roots[i]
                              };
                            });
                            res.send(wordObj);
                          }
                        });
                      });
                    }
                  });
                });
              }
            });
          });
        });
      });
    });
  };

  module.exports = {
    registerRoutes: registerRoutes
  };

}());
