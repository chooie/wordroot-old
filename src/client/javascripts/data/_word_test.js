// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");
  var Word = require("./Word");
  var testWord = require("./testWord");

  describe("Word", function() {
    var wordObj;

    beforeEach(function() {
      wordObj = new Word(testWord);
    });

    it("has a meaning", function() {
      assert.equal(
        wordObj.getMeaning(),
        "The story that someone writes about their own life"
      );
    });

    it("has roots", function() {
      var roots = wordObj.getRoots();
      roots.forEach(function (root) {
        assert.ok(root.word);
        assert.ok(root.language);
        assert.ok(root.meaning);
      });
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
