// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");
  var wordAPI = require("./WordAPI");

  describe("Word API", function() {
    it("gets a word", function(done) {
      wordAPI.make()
      .then(function(word) {
        assert.ok(word);
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
    });
  });
}());
