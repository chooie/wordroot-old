// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");
  var listeners = require("./listeners");

  function addDirectory(container, router) {
    var options = { classes: [ "directory" ] };
    var directory = util.addElement(container, "ul", options);
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
      var elem = util.addElement(container, "li", options);
      elem.innerHTML = word;
      return elem;
    }
  }

  module.exports = {
    addDirectory: addDirectory
  };

}());
