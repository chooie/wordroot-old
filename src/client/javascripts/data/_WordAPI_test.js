// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");
  var wordAPI = require("./WordAPI");
  var testWords = require("./testWords");

  describe("Word API", function() {
    it("gets a word", function(done) {
      var testWord = testWords[0].word;
      wordAPI.make(testWord)
      .then(function(word) {
        assert.ok(word);
        done();
      })
      .catch(function(err) {
        console.log(err);
        done(err);
      });
    });

    it("gets a list of words", function(done) {
      wordAPI.list()
      .then(function(words) {
        words.forEach(function(word) {
          assert.ok(typeof word === "string");
        });
        done();
      })
      .catch(function(err) {
        console.log(err);
        done(err);
      });
    });
  });
}());
