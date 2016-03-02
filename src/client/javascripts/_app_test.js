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

    it("populates title", function() {
      app.populateTitle(container);
      assert.ok(container.toString().indexOf("autobiography" > 0));
    });

    it("populates meaning", function() {
      app.populateMeaning(container);
      assert.ok(container.toString().indexOf("the story"));
    });
  });

}());
