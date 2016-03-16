// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  function Router() {}

  Router.prototype.initialise = function initialise(config) {
    if (!config.routes) throw new Error("Must initialise with routes");
    config.routes.forEach(function(route) {
      if (typeof route.name !== "string") {
        throw new Error("Each route must have a name");
      }
      if (typeof route.handler !== "function") {
        throw new Error("Each route must have a handler");
      }
    });
    this.routes = config.routes;
    this.before = config.before;
    this.after = config.after;
  };

  Router.prototype.getRoutes = function getRoutes() {
    return this.routes;
  };

  Router.prototype._getRoute = function _getRoute(routeName) {
    for (var i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].name === routeName) {
        return this.routes[i];
      }
    }
  };

  Router.prototype.navigateTo = function navigateTo(routeName) {
    var route = this._getRoute(routeName);
    if (this.before) this.before();
    route.handler();
    if (this.after) this.after();
  };

  module.exports = Router;

}());
