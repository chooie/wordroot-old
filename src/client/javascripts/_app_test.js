// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");
  var app = require("./app");

  describe("App", function() {
    var container;
    beforeEach(function() {
      container = document.createElement("div");
    });

    it("populates title composed of root parts", function() {
      app.populateTitle(container);
      assertStringInElement(container, "autobiography");
    });

    it("populates meaning", function() {
      app.populateMeaning(container);
      assertStringInElement(container, "the story");
    });
  });

  function assertStringInElement(element, string) {
    var elementStr = element.innerHTML;
    assert.ok(elementStr.indexOf(string) > -1);
  }

}());
