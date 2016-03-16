// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var constants = require("../constants");

  function addElement(container, elementType, options) {
    options = options || {};
    checkOptions(options);
    var element = document.createElement(elementType);

    if (options.id) {
      if (typeof options.id !== "string") {
        throw new Error("ID must be a string");
      }
      element.id = options.id;
    }

    if (options.classes) {
      if (!Array.isArray(options.classes)) {
        throw new Error("Classes must be passed as an array");
      }
      options.classes.forEach(function(_class) {
        element.classList.add(_class);
      });
    }
    container.appendChild(element);
    return element;

    function checkOptions(options) {
      if (typeof options !== "object" || Array.isArray(options)) {
        throw new Error("Options must be passed as an object");
      }
    }
  }

  function removeElement(element) {
    element.parentNode.removeChild(element);
  }

  function addLoadingClass(elem) {
    elem.classList.add(constants.cssClasses.loading);
  }

  function removeLoadingClass(elem) {
    elem.classList.remove(constants.cssClasses.loading);
  }

  module.exports = {
    addElement: addElement,
    removeElement: removeElement,
    addLoadingClass: addLoadingClass,
    removeLoadingClass: removeLoadingClass,
  };

}());
