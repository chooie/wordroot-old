// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");
  var constants = require("../constants");

  function addTitle(container, rootParts, roots) {
    var containerClass = constants.cssClasses.container;
    var titleClass = "title";
    var options = { classes: [ containerClass, titleClass ] };
    var title = util.addElement(container, "div", options);
    addRootParts(title, rootParts);
    addRoots(title, roots);
  }

  function addRootParts(container, rootParts) {
    var rootPartsClass = constants.cssClasses.rootParts;
    var classes = [ rootPartsClass ];
    var options = { classes: classes };
    var div = util.addElement(container, "div", options);
    rootParts.forEach(function(rootPart, i) {
      createRootPart(div, rootPart, i);
    });

    function createRootPart(container, rootPart, index) {
      var COLORS = ["blue", "green", "red"];
      var rootClass = constants.cssClasses.rootPart;
      var options = { id: "root-part-" + index, classes: [ rootClass ]};
      var rootElem = util.addElement(container, "p", options);
      rootElem.style.color = COLORS[index % COLORS.length];
      rootElem.innerHTML = rootPart;
    }
  }

  function addRoots(container, roots) {
    var rootClass = "roots";
    var classes = [ rootClass ];
    var div = util.addElement(container, "div", { classes: classes });

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
      var rootElem = util.addElement(container, "div", options);
      var word = util.addElement(rootElem, "div",
        { classes: [ "root-word" ] });
      word.innerHTML = root.word;
      var meaning = util.addElement(rootElem, "div",
        { classes: [ "root-meaning" ] });
      meaning.innerHTML = root.meaning;
      var language = util.addElement(rootElem, "div",
        { classes: [ "root-language" ] });
      language.innerHTML = root.language;
    }
  }

  function addMeaning(container, meaning) {
    var containerClass = constants.cssClasses.container;
    var meaningClass = constants.cssClasses.meaning;
    var classes = [ containerClass, meaningClass ];
    var div = util.addElement(container, "div", { classes: classes });
    createMeaning(div);

    function createMeaning(container) {
      var p = util.addElement(container, "p");
      p.innerHTML = meaning;
    }
  }

  module.exports = {
    addTitle: addTitle,
    addRootParts: addRootParts,
    addRoots: addRoots,
    addMeaning: addMeaning
  };

}());
