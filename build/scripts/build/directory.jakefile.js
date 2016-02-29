// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var paths = require("../../config/paths");

  module.exports = function() {
    directory(paths.testDir);
    directory(paths.clientDistDir);
  };

}());
