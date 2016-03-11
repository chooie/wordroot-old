// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  var util = require("./util");
  var constants = require("../constants");

  function putTitle(container, rootParts, roots) {
    return Q.fcall(function() {
      var containerClass = constants.cssClasses.container;
      var titleClass = "title";
      var options = { classes: [ containerClass, titleClass ] };
      var title = util.putElement(container, "div", options);
      Q.all([
        putRootParts(title, rootParts),
        putRoots(title, roots)
      ]);
    });
  }

  function putRootParts(container, rootParts) {
    return Q.fcall(function() {
      var rootPartsClass = constants.cssClasses.rootParts;
      var classes = [ rootPartsClass ];
      var options = { classes: classes };
      var div = util.putElement(container, "div", options);
      rootParts.forEach(function(rootPart, i) {
        createRootPart(div, rootPart, i);
      });

      function createRootPart(container, rootPart, index) {
        var COLORS = ["blue", "green", "red"];
        var rootClass = constants.cssClasses.rootPart;
        var options = { id: "root-part-" + index, classes: [ rootClass ]};
        var rootElem = util.putElement(container, "p", options);
        rootElem.style.color = COLORS[index % COLORS.length];
        rootElem.innerHTML = rootPart;
      }
    });
  }

  function putRoots(container, roots) {
    return Q.fcall(function() {
      var rootClass = "roots";
      var classes = [ rootClass ];
      var div = util.putElement(container, "div", { classes: classes });

      roots.forEach(function(root, index) {
        createRootInfoElem(div, root, index);
      });

      function createRootInfoElem(container, root, index) {
        var rootElemClass = "root-info";
        var classes = [ rootElemClass ];
        if (index === 0) {
          classes.push("active");
        }
        var options = { id: rootElemClass + "-" + index, classes: classes  };
        var rootElem = util.putElement(container, "div", options);
        var word = util.putElement(rootElem, "div",
          { classes: [ "root-word" ] });
        word.innerHTML = root.word;
        var meaning = util.putElement(rootElem, "div",
          { classes: [ "root-meaning" ] });
        meaning.innerHTML = root.meaning;
        var language = util.putElement(rootElem, "div",
          { classes: [ "root-language" ] });
        language.innerHTML = root.language;
      }
    });
  }

  function putMeaning(container, meaning) {
    return Q.fcall(function() {
      var containerClass = constants.cssClasses.container;
      var meaningClass = constants.cssClasses.meaning;
      var classes = [ containerClass, meaningClass ];
      var div = util.putElement(container, "div", { classes: classes });
      createMeaning(div);

      function createMeaning(container) {
        var p = util.putElement(container, "p");
        p.innerHTML = meaning;
      }
    });
  }

  module.exports = {
    putTitle: putTitle,
    putRootParts: putRootParts,
    putRoots: putRoots,
    putMeaning: putMeaning
  };

}());
