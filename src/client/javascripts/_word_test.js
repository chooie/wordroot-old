// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");
  var word = require("./word");

  describe("Word", function() {
    it("returns a word", function() {
      var _word = word.getWord();
      assert.ok(_word);

      describe("The _word", function() {
        it("has a meaning", function() {
          assert.ok(_word.meaning);
        });
        it("has roots", function() {
          assert.ok(_word.roots.length > 0);
        });
      });
    });
  });

}());
