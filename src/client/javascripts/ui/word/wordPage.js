// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./../util");
  var css = require("../../constants").cssClasses;
  var rootsTitle = require("./rootsTitle");
  var revealer = require("./../revealer");

  function addTitle(container, rootParts, roots) {
    var options = { classes: [ css.container, "title" ] };
    var title = util.addElement(container, "div", options);
    var rootPartElems = rootsTitle.addRootParts(title, rootParts);
    var rootElems = rootsTitle.addRoots(title, roots);
    revealer.initialise(rootPartElems, rootElems);
    return title;
  }

  function addMeaning(container, meaning) {
    var classes = [ css.container, css.meaning ];
    var div = util.addElement(container, "div", { classes: classes });
    div.innerHTML = meaning;
    return div;
  }

  module.exports = {
    addTitle: addTitle,
    addMeaning: addMeaning
  };

}());
