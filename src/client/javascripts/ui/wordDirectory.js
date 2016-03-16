// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");
  var listeners = require("./listeners");
  var css = require("../constants").cssClasses;

  function addDirectory(container, router) {
    var options = { classes: [ css.container, "directory" ] };
    var directory = util.addElement(container, "div", options);
    router.routes.forEach(function(route) {
      var elem = createWordElem(directory, route.name);
      elem.addEventListener("click", function() {
        router.navigateTo(route.name);
      });
      listeners.preventDoubleClickHighlight(elem);
    });
    return directory;

    function createWordElem(container, word) {
      var options = { classes: [ "directory-elem" ] };
      var elem = util.addElement(container, "p", options);
      elem.innerHTML = word;
      return elem;
    }
  }

  module.exports = {
    addDirectory: addDirectory
  };

}());
