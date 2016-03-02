// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");
  var app = require("./app");

  describe("App", function() {
    it("returns a word", function() {
      var word = app.getWord();
      assert.ok(word);

      describe("The word", function() {
        it("has a meaning", function() {
          assert.ok(word.meaning);
        });
        it("has roots", function() {
          assert.ok(word.roots.length > 0);
        });
      });
    });
  });

}());
