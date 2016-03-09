// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  var util = require("./util");

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
      var div = util.putElement(container, "div");
      roots.forEach(function(root) {
        addRoot(div, root);
      });
    });

    function addRoot(container, root) {
      var rootElem = util.putElement(container, "p");
      rootElem.innerHTML = root;
    }
  }

  function populateMeaning(container, meaning) {
    return Q.fcall(function() {
      var div = util.putElement(container, "div");
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
