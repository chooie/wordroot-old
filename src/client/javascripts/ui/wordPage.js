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

  function populateCompositeRootPartsTitle(container, rootParts, roots) {
    return Q.fcall(function() {
      var rootPartTitle = constants.cssClasses.rootPartTitle;
      var containerClass = constants.cssClasses.container;
      var classes = [ containerClass, rootPartTitle ];
      var div = util.putElement(container, "div", classes);
      rootParts.forEach(function(rootPart, i) {
        addRootPart(div, rootPart, i);
      });

      if (roots) {
        roots.forEach(function(root) {
          populateRootInfo(div, root);
        });
      }

      function addRootPart(container, root, index) {
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

  function populateRootInfo(container, rootInfo) {
    return Q.fcall(function() {
      var containerClass = constants.cssClasses.container;
      var rootClass = "root-info";
      var classes = [ containerClass, rootClass ];
      var div = util.putElement(container, "div", classes);

      createRootInfo(div);

      function createRootInfo(container) {
        var word = util.putElement(container, "div");
        word.innerHTML = rootInfo.word;
        var meaning = util.putElement(container, "div");
        meaning.innerHTML = rootInfo.meaning;
        var language = util.putElement(container, "div");
        language.innerHTML = rootInfo.language;
      }
    });
  }

  module.exports = {
    populateTitle: populateTitle,
    populateMeaning: populateMeaning,
    populateCompositeRootPartsTitle: populateCompositeRootPartsTitle,
    populateRootInfo: populateRootInfo
  };

}());
