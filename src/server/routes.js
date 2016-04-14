// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");
  var wordsRequestHandlers = require("./wordsRequestHandlers");

  function registerRoutes(app) {
    app.get("/test-db", function(req, res) {
      var connection = util.connectToDB();

      connection.query('SELECT 1 + 1 AS solution', function(err, rows
                                                            /*fields*/) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
        res.send("Solution: " + rows[0].solution);
      });

      connection.end();
    });

    app.get("/words", wordsRequestHandlers.list);

    app.get("/words/:word", wordsRequestHandlers.wordInfo);
  }

  module.exports = {
    registerRoutes: registerRoutes
  };

}());
