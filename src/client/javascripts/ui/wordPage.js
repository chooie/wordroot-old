// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  var util = require("./util");
  var constants = require("../constants");

  function populateTitle(container, title) {
    return Q.fcall(function() {
      var div = util.putElement(container, "div");
      createHeader(div);

      function createHeader(container) {
        var header = util.putElement(container, "h1");
        header.innerHTML = title;
      }
    });
  }

  function populateCompositeRootPartsTitle(container, roots) {
    return Q.fcall(function() {
      var rootPartTitle = constants.cssClasses.rootPartTitle;
      var containerClass = constants.cssClasses.container;
      var classes = [ containerClass, rootPartTitle ];
      var div = util.putElement(container, "div", classes);
      roots.forEach(function(root, i) {
        addRoot(div, root, i);
      });

      function addRoot(container, root, index) {
        var COLORS = ["blue", "green", "red"];
        var rootClass = constants.cssClasses.rootPart;
        var rootElem = util.putElement(container, "p", [rootClass]);
        rootElem.style.color = COLORS[index % COLORS.length];
        rootElem.innerHTML = root;
      }
    });
  }

  function populateMeaning(container, meaning) {
    return Q.fcall(function() {
      var containerClass = constants.cssClasses.container;
      var meaningClass = constants.cssClasses.meaning;
      var classes = [ containerClass, meaningClass ];
      var div = util.putElement(container, "div", classes);
      createMeaning(div);

      function createMeaning(container) {
        var p = util.putElement(container, "p");
        p.innerHTML = meaning;
      }
    });
  }

  module.exports = {
    populateTitle: populateTitle,
    populateMeaning: populateMeaning,
    populateCompositeRootPartsTitle: populateCompositeRootPartsTitle
  };

}());
