// Copyright (c) 2012-2014 Titanium I.T. LLC. All rights reserved. See
// LICENSE.txt for details.

// Main build file. Contains all tasks needed for normal development.
(function() {
	"use strict";

  var generalTasks = require("./general.jakefile");
  var lintTasks = require("./lint.jakefile");
  var testTasks = require("./test.jakefile");
  var buildTasks = require("./build.jakefile");
  var versionTasks = require("./version.jakefile");
  var directoryTasks = require("./directory.jakefile");

	var strict = !process.env.loose;

  generalTasks();
	lintTasks();
  testTasks(strict);
  buildTasks();
  versionTasks(strict);
  directoryTasks();

}());
