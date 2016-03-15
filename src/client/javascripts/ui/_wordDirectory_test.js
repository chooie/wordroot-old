// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  //var assert = require("../../../shared/assert");

  var util = require("./util");
  var testUtil = require("./testUtil");
  var wordDirectory = require("./wordDirectory");

  describe("Word Directory", function() {
    var container;

    beforeEach(function() {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(function() {
      util.removeElement(container);
    });

    it("adds a directory of words", function() {
      var words = [ "word1", "word2", "word3" ];
      wordDirectory.addDirectory(container, words);
      words.forEach(function(word) {
        testUtil.assertStringInElement(container, word, word);
      });
    });
  });

}());
