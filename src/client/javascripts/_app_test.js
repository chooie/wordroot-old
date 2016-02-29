// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");
  var app = require("./app");

  describe("App", function() {
    it("returns a word", function() {
      assert.ok(app.getWord());
    });
  });

}());
