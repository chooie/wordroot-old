// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");
  var word = require("./word");

  describe("Word", function() {
    var wordObj;

    beforeEach(function(done) {
      word.make()
      .then(function(word) {
        wordObj = word;
        done();
      });
    });

    it("has a meaning", function() {
      assert.ok(wordObj.info.meaning);
    });

    it("has roots", function() {
      var numOfRoots = wordObj.info.roots.length;
      assert.ok(numOfRoots > 0);
    });

    it("has parts that make up word", function() {
      var word = wordObj.info.word;
      var accumWord = "";
      wordObj.getRootParts().forEach(function(rootPart) {
        accumWord += rootPart;
      });
      assert.equal(accumWord, word, "parts make up word");
    });
  });

}());
