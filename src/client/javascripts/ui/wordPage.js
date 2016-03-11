// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");
  var constants = require("../constants");
  var revealer = require("./revealer");

  function addTitle(container, rootParts, roots) {
    var containerClass = constants.cssClasses.container;
    var titleClass = "title";
    var options = { classes: [ containerClass, titleClass ] };
    var title = util.addElement(container, "div", options);
    var rootPartElems = addRootParts(title, rootParts);
    var rootElems = addRoots(title, roots);
    revealer.initialise(rootPartElems, rootElems);
  }

  function addRootParts(container, rootParts) {
    var rootPartsClass = constants.cssClasses.rootParts;
    var classes = [ rootPartsClass ];
    var options = { classes: classes };
    var div = util.addElement(container, "div", options);
    var rootPartElems = [];
    rootParts.forEach(function(rootPart, i) {
      rootPartElems.push(createRootPart(div, rootPart, i));
    });
    return rootPartElems;

    function createRootPart(container, rootPart, index) {
      var COLORS = ["blue", "green", "red"];
      var rootClass = constants.cssClasses.rootPart;
      var options = { id: "root-part-" + index, classes: [ rootClass ]};
      var rootPartElem = util.addElement(container, "p", options);
      rootPartElem.style.color = COLORS[index % COLORS.length];
      rootPartElem.innerHTML = rootPart;
      return rootPartElem;
    }
  }

  function addRoots(container, roots) {
    var rootClass = "roots";
    var classes = [ rootClass ];
    var div = util.addElement(container, "div", { classes: classes });
    var rootElems = [];
    roots.forEach(function(root, index) {
      rootElems.push(createRootInfoElem(div, root, index));
    });
    return rootElems;

    function createRootInfoElem(container, root, index) {
      var rootElemClass = "root-info";
      var classes = [ rootElemClass ];
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
      return rootElem;
    }
  }

  function addMeaning(container, meaning) {
    var containerClass = constants.cssClasses.container;
    var meaningClass = constants.cssClasses.meaning;
    var classes = [ containerClass, meaningClass ];
    var div = util.addElement(container, "div", { classes: classes });
    var meaningElem = createMeaning(div);

    function createMeaning(container) {
      var p = util.addElement(container, "p");
      p.innerHTML = meaning;
    }
    return meaningElem;
  }

  module.exports = {
    addTitle: addTitle,
    addRootParts: addRootParts,
    addRoots: addRoots,
    addMeaning: addMeaning
  };

}());
