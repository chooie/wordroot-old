// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");
  var css = require("../constants").cssClasses;
  var revealer = require("./revealer");

  function addTitle(container, rootParts, roots) {
    var options = { classes: [ css.container, "title" ] };
    var title = util.addElement(container, "div", options);
    var rootPartElems = addRootParts(title, rootParts);
    var rootElems = addRoots(title, roots);
    revealer.initialise(rootPartElems, rootElems);
    return title;
    }

  function addRootParts(container, rootParts) {
    var div = util.addElement(container, "div", { classes: [ css.rootParts ] });
    var rootPartElems = [];
    rootParts.forEach(function(rootPart, i) {
      rootPartElems.push(createRootPart(div, rootPart, i));
    });
    return rootPartElems;

    function createRootPart(container, rootPart, index) {
      var elem = util.addElement(container, "p", { classes: [ css.rootPart ]});
      setColorBasedOnIndex(elem, index);
      elem.innerHTML = rootPart;
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
      rootElems.push(addRootInfoElem(div, root));
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

  function addMeaning(container, meaning) {
    var classes = [ css.container, css.meaning ];
    var div = util.addElement(container, "div", { classes: classes });
    div.innerHTML = meaning;
    return div;
  }

  module.exports = {
    addTitle: addTitle,
    addRootParts: addRootParts,
    addRoots: addRoots,
    addMeaning: addMeaning
  };

}());
