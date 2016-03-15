// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");
  var css = require("../constants").cssClasses;

  function addRootParts(container, rootParts) {
    // rootParts { part: str, hasRoot: bool }
    var div = util.addElement(container, "div", { classes: [ css.rootParts ] });
    var rootPartElems = [];
    var rootPartIndex = 0;
    rootParts.forEach(function(rootPart) {
      rootPartElems.push(createRootPart(div, rootPart, rootPartIndex));
      if (rootPart.hasRoot) {
        rootPartIndex += 1;
      }
    });
    return rootPartElems;

    function createRootPart(container, rootPart, index) {
      if (!rootPart.part) throw new Error("Must have part");
      if (typeof rootPart.hasRoot === "undefined") {
        throw new Error("Must have hasRoot");
      }
      var elem;
      if (rootPart.hasRoot) {
        var options = { classes: [ css.rootPart ] };
        elem = util.addElement(container, "p", options);
        setColorBasedOnIndex(elem, index);
      } else {
        options = { classes: [ "part-no-root" ] };
        elem = util.addElement(container, "p", options);
      }

      elem.innerHTML = rootPart.part;
      return elem;

      function setColorBasedOnIndex(elem, i) {
        var COLORS = ["blue", "green", "red"];
        elem.style.color = COLORS[i % COLORS.length];
      }
    }
  }

  function addRoots(container, roots) {
    var div = util.addElement(container, "div", { classes: [ "roots" ] });
    var rootElems = [];
    roots.forEach(function(root) {
      if (root) {
        return rootElems.push(addRootInfoElem(div, root));
      }
      rootElems.push(undefined);

    });
    return rootElems;

    function addRootInfoElem(container, root) {
      var rootElemOptions = { classes: [ "root-info" ]  };
      var rootElem = util.addElement(container, "div", rootElemOptions);
      addWord(rootElem);
      addMeaning(rootElem);
      addLanguage(rootElem);
      return rootElem;

      function addWord(container) {
        var word = util.addElement(container, "div",
          { classes: [ "root-word" ] });
        word.innerHTML = root.word;
      }

      function addLanguage(container) {
        var language = util.addElement(container, "div",
          { classes: [ "root-language" ] });
        language.innerHTML = root.language;
      }

      function addMeaning(container) {
        var meaning = util.addElement(container, "div",
          { classes: ["root-meaning"] });
        meaning.innerHTML = root.meaning;
      }
    }
  }

  module.exports = {
    addRootParts: addRootParts,
    addRoots: addRoots
  };

}());
