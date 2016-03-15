// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");
  var Word = require("./Word");
  var testWord_somePartsHaveRoots = require("./testWord_somePartsHaveRoots");

  describe("Word", function() {
    var wordObj;

    beforeEach(function() {
      wordObj = new Word(testWord_somePartsHaveRoots);
    });

    it("has a meaning", function() {
      assert.equal(
        wordObj.getMeaning().toLowerCase(),
        testWord_somePartsHaveRoots.meaning
      );
    });

    it("has roots", function() {
      var roots = wordObj.getRoots();
      roots.forEach(function (root, i) {
        if (i < 2) {
          assert.ok(root.word);
          assert.ok(root.language);
          assert.ok(root.meaning);
        } else {
          assert.notOk(root);
        }
      });
    });

    it("has parts that make up word", function() {
      var word = wordObj.info.word;
      var accumWord = "";
      wordObj.getRootParts().forEach(function(rootPart) {
        accumWord += rootPart.part;
      });
      assert.equal(accumWord, word, "parts make up word");
    });

    it("has parts where some have a related root and others don't", function() {
      wordObj.getRootParts().forEach(function(rootPart, i) {
        if (i < 2) {
          assert.ok(rootPart.hasRoot);
        } else {
          assert.notOk(rootPart.hasRoot);
        }
      });
    });
  });

}());
