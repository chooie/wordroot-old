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
      app.run(container);
      assert.ok(container.toString().indexOf("autobiography" > 0));
    });
  });

}());
