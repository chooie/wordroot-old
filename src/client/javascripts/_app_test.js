// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");
  var app = require("./app");
  var wordUtil = require("./word");

  describe("App", function() {
    var container;
    var word;
    beforeEach(function(done) {
      container = document.createElement("div");
      wordUtil.getWord()
      .then(function(data) {
        word = data;
        done();
      });
    });

    it("populates title composed of root parts", function() {
      app.populateTitle(container)
      .then(function() {
        assertStringInElement(container, "autobiography");
      });
    });

    it("populates meaning", function() {
      app.populateMeaning(container)
      .then(function() {
        assertStringInElement(container, "the story");
      });
    });
  });

  function assertStringInElement(element, string) {
    var elementStr = element.innerHTML;
    assert.ok(elementStr.indexOf(string) > -1);
  }

}());
