// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var jshint = require("simplebuild-jshint");
  var jshintConfig = require("../../config/jshint.conf.js");

  module.exports = function() {
    var SHARED_JS = "src/shared/**/*.js";

    desc("Lint everything");
    task("lint", ["lintNode", "lintClient"]);

    task("lintNode", function() {
      process.stdout.write("Linting Node.js code: ");
      jshint.checkFiles({
        files: [ "src/*.js", "src/server/**/*.js", "build/**/*.js", SHARED_JS ],
        options: jshintConfig.nodeOptions,
        globals: jshintConfig.nodeGlobals
      }, complete, fail);
    }, { async: true });

    task("lintClient", function() {
      process.stdout.write("Linting browser code: ");
      jshint.checkFiles({
        files: [ "src/client/**/*.js", SHARED_JS ],
        options: jshintConfig.clientOptions,
        globals: jshintConfig.clientGlobals
      }, complete, fail);
    }, { async: true });
  };

}());
