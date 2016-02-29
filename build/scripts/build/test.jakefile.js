// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var mocha = require("../../util/mocha_runner");
  var karma = require("../../util/karma_runner");

  var paths = require("../../config/paths");
  var browsers = require("../../config/tested_browsers");


  var KARMA_CONFIG = "./build/config/karma.conf.js";
  var MOCHA_CONFIG = {
    ui: "bdd",
    reporter: "dot"
  };

  module.exports = function(strict) {
    desc("Start Karma server -- run this first");
    task("karma", function() {
      karma.serve(KARMA_CONFIG, complete, fail);
    }, { async: true });

    desc("Run tests");
    task("test", [ "testServer", "testClient", "testSmoke" ]);

    task("testServer", [ paths.testDir ], function() {
      process.stdout.write("Testing Node.js code: ");
      mocha.runTests({
        files: [ "src/server/**/_*_test.js" ],
        options: MOCHA_CONFIG
      }, complete, fail);
    }, { async: true });

    task("testClient", function() {
      console.log("Testing browser code: ");
      karma.runTests({
        configFile: KARMA_CONFIG,
        browsers: browsers,
        strict: strict
      }, complete, fail);
    }, { async: true });

    task("testSmoke", [ "build" ], function() {
      process.stdout.write("Running local smoke tests: ");
      mocha.runTests({
        files: [ "src/_smoke_test.js" ],
        options: MOCHA_CONFIG
      }, complete, fail);
    }, { async: true });
  };

}());
