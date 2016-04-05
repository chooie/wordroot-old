// Copyright (c) 2012-2015 Titanium I.T. LLC. All rights reserved. See
// LICENSE.txt for details.

// An example server. Just a placeholder.

(function() {
	"use strict";

  var express = require("express");
  var app = express();

  var routes = require("./routes");

	var server;

	exports.start = function(portNumber, dirToServe, callback) {
    app.use(express.static(dirToServe));

    routes.registerRoutes(app);

    server = app.listen(portNumber, callback);
	};

	exports.stop = function(callback) {
		server.close(callback);
	};

}());
