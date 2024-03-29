// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");
  var Router = require("./Router");

  describe("Router", function() {
    var router;

    beforeEach(function() {
      router = new Router();
    });

    it("has routes", function() {
      var routes = [
        { name: "route1", handler: function() {} },
        { name: "route2", handler: function() {} },
        { name: "route3", handler: function() {} }
      ];
      router.initialise({ routes: routes });
      var routerRoutes = router.getRoutes();
      assert.equal(routerRoutes, routes, "Routes are properly added");
    });

    it("executes a route handler when navigating to a route", function() {
      var executed = false;
      var routeHandler = function() {
        executed = true;
      };
      var routes = [ { name: "route1", handler: routeHandler } ];
      router.initialise({ routes: routes });
      router.navigateTo("route1");
      assert.ok(executed);
    });

    it("executes a before and after method when navigating to a " +
      "route", function() {
      var beforeExecuted = false;
      var afterExecuted = false;
      var before = function() {
        beforeExecuted = true;
      };
      var after = function() {
        afterExecuted = true;
      };
      var routes = [ { name: "route1", handler: function() {} } ];
      router.initialise({ routes: routes, before: before, after: after });
      router.navigateTo("route1");
      assert.ok(beforeExecuted, "Before method executed");
      assert.ok(afterExecuted, "After method executed");
    });
  });
}());
