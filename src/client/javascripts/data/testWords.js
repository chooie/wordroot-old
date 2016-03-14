// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var testWord_allPartsHaveRoots = require("./testWord_allPartsHaveRoots");
  var testWord_somePartsHaveRoots = require("./testWord_somePartsHaveRoots");

  module.exports = [
    testWord_allPartsHaveRoots,
    testWord_somePartsHaveRoots
  ];

}());
