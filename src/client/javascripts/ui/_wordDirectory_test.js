// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  //var assert = require("../../../shared/assert");

  var util = require("./util");
  var testUtil = require("./testUtil");
  var wordDirectory = require("./wordDirectory");
  var Router = require("../Router");

  describe("Word Directory", function() {
    var container;

    beforeEach(function() {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(function() {
      util.removeElement(container);
    });

    it("adds a directory of elements from a router", function() {
      var router = new Router();
      var routes = [
        { name: "route1", handler: function() { console.log("hey") ; } },
        { name: "route2", handler: function() {} },
        { name: "route3", handler: function() {} }
      ];

      router.initialise({ routes: routes });
      wordDirectory.addDirectory(container, router);
      routes.forEach(function(route) {
        testUtil.assertStringInElement(container, route.name, route.name);
      });
    });
  });

}());
