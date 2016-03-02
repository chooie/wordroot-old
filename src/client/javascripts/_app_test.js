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
      var titleStr = container.innerHTML;
      assert.ok(titleStr.indexOf("autobiography") > -1);
    });

    it("populates meaning", function() {
      app.populateMeaning(container);
      var meaningStr = container.innerHTML;
      assert.ok(meaningStr.indexOf("the story") > -1);
    });
  });

}());
