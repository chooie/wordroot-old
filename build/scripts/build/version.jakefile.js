// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var version = require("../../util/version_checker");

  module.exports = function(strict) {
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
  };

}());
