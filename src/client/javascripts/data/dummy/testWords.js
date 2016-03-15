// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var testWord_allPartsHaveRoots = require("./testWord_allPartsHaveRoots");
  var testWord_somePartsHaveRoots = require("./testWord_somePartsHaveRoots");
  var testWord_longWord = require("./testWord_longWord");

  module.exports = [
    testWord_allPartsHaveRoots,
    testWord_somePartsHaveRoots,
    testWord_longWord
  ];

}());
