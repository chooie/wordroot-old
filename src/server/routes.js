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
        "WHERE words.word = " + word, function (err, rows) {
        if (err) throw err;

        res.send(rows[0]);
      });
    });
  };

  module.exports = {
    registerRoutes: registerRoutes
  };

}());
