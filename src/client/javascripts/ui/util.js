// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var constants = require("../constants");

  function putElement(container, elementType, classes) {
    var element = document.createElement(elementType);
    if (classes) {
      if (!Array.isArray(classes)) {
        throw new Error("Classes must be passed as an array");
      }
      classes.forEach(function(_class) {
        element.classList.add(_class);
      });
    }
    container.appendChild(element);
    return element;
  }

  function removeElement(element) {
    element.parentNode.removeChild(element);
  }

  function removeLoadingClass() {
    var loadingClass = constants.cssClasses.loading;
    var loadingElems = document.getElementsByClassName(loadingClass);
    for (var i = 0; i < loadingElems.length; i += 1) {
      loadingElems[i].classList.remove(loadingClass);
    }
  }

  module.exports = {
    putElement: putElement,
    removeElement: removeElement,
    removeLoadingClass: removeLoadingClass,
  };

}());