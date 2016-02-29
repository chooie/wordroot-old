// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var shell = require("shelljs");
  var paths = require("../../config/paths.js");

  module.exports = function() {
    var startTime = Date.now();

    desc("Lint and test");
    task("default", ["version", "lint", "test"], function() {
      var elapsedSeconds = (Date.now() - startTime) / 1000;
      console.log("\n\nBUILD OK  (" + elapsedSeconds.toFixed(2) + "s)");
    });

    desc("Start server (for manual testing)");
    task("run", [ "build" ], function() {
      console.log("Starting server. Press Ctrl-C to exit.");
      jake.exec(
        "node " + paths.distDir + "/run.js 5000",
        { interactive: true },
        complete
      );
    }, { async: true });

    desc("Delete generated files");
    task("clean", function() {
      shell.rm("-rf", paths.generatedDir);
    });
  };

}());
