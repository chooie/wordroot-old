// Copyright (c) 2012-2015 Titanium I.T. LLC. All rights reserved. See
// LICENSE.txt for details.

// An example server. Just a placeholder.

(function() {
	"use strict";

  var express = require("express");
  var app = express();

  var db = require("./db");

  var connection = db.createConnection({
    host: 'localhost',
    user: 'root',
  });

	var server;

	exports.start = function(portNumber, dirToServe, callback) {
    app.use(express.static(dirToServe));

    app.get("/hello", function(req, res) {
      connection.connect();

      connection.query('SELECT 1 + 1 AS solution', function(err, rows
                                                            /*fields*/) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
        res.send(rows[0].solution);
      });

      connection.end();
    });

    server = app.listen(portNumber, callback);
	};

	exports.stop = function(callback) {
		server.close(callback);
	};

}());
