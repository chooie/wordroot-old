// Copyright (c) 2012-2014 Titanium I.T. LLC. All rights reserved. See
// LICENSE.txt for details.

// Main build file. Contains all tasks needed for normal development.
(function() {
	"use strict";

	var shell = require("shelljs");
	var browserify = require("../../util/browserify_runner.js");
	var version = require("../../util/version_checker.js");

	var paths = require("../../config/paths.js");

  var generalTasks = require("./general.jakefile.js");
  var lintTasks = require("./lint.jakefile.js");
  var testTasks = require("./test.jakefile.js");

	var strict = !process.env.loose;

  generalTasks();
	lintTasks();
  testTasks(strict);

	//*** BUILD

	desc("Build distribution package");
	task("build", [ "prepDistDir", "buildClient", "buildServer" ]);

	task("prepDistDir", function() {
		shell.rm("-rf", paths.distDir);
	});

	task("buildClient", [ paths.clientDistDir, "bundleClientJs" ], function() {
		console.log("Copying client code: .");
		shell.cp(
      paths.clientDir + "/*.html", paths.clientDir + "/*.css",
      paths.clientDistDir
    );
	});

	task("bundleClientJs", [ paths.clientDistDir ], function() {
		console.log("Bundling browser code with Browserify: .");
		browserify.bundle({
			entry: paths.clientEntryPoint,
			outfile: paths.clientDistBundle,
			options: {
				standalone: "example",
				debug: true
			}
		}, complete, fail);
	}, { async: true });

	task("buildServer", function() {
		console.log("Copying server code: .");
		shell.cp("-R", paths.serverDir, paths.serverEntryPoint, paths.distDir);
	});


	//*** CHECK VERSIONS

	desc("Check Node version");
	task("version", function() {
		console.log("Checking Node.js version: .");
		version.check({
			name: "Node",
			expected: require("../../../package.json").engines.node,
			actual: process.version,
			strict: strict
		}, complete, fail);
	}, { async: true });


	//*** CREATE DIRECTORIES

	directory(paths.testDir);
	directory(paths.clientDistDir);

}());
