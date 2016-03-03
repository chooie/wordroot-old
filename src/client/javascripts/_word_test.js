// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");
  var word = require("./word");

  describe("Word", function() {
    var wordObj;

    beforeEach(function(done) {
      word.getWord()
      .then(function(word) {
        wordObj = word;
        done();
      });
    });

    it("has a meaning", function() {
      assert.ok(wordObj.meaning);
    });

    it("has roots", function() {
      var numOfRoots = wordObj.roots.length;
      assert.ok(numOfRoots > 0);
    });

    it("has parts that make up word", function() {
      var word = wordObj.word;
      var accumWord = "";
      wordObj.roots.forEach(function(root) {
        accumWord += root.part;
      });
      assert.equal(accumWord, word, "parts make up word");
    });
  });

}());
