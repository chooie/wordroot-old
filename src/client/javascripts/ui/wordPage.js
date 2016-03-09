// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  function populateTitle(container, title) {
    return Q.fcall(function() {
      var div = putElement(container, "div");
      createHeader(div);

      function createHeader(container) {
        var header = putElement(container, "h1");
        header.innerHTML = title;
      }
    });
  }

  function populateCompositeRootPartsTitle(container, roots) {
    return Q.fcall(function() {
      var div = putElement(container, "div");
      roots.forEach(function(root) {
        addRoot(div, root);
      });
    });

    function addRoot(container, root) {
      var rootElem = putElement(container, "p");
      rootElem.innerHTML = root;
    }
  }

  function populateMeaning(container, meaning) {
    return Q.fcall(function() {
      var div = putElement(container, "div");
      createMeaning(div);

      function createMeaning(container) {
        var p = putElement(container, "p");
        p.innerHTML = meaning;
      }
    });
  }

  function putElement(container, elementType) {
    var element = document.createElement(elementType);
    container.appendChild(element);
    return element;
  }

  module.exports = {
    populateTitle: populateTitle,
    populateMeaning: populateMeaning,
    populateCompositeRootPartsTitle: populateCompositeRootPartsTitle
  };

}());
