// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var constants = require("../constants");

  function removeLoadingClass() {
    var loadingClass = constants.cssClasses.loading;
    var loadingElems = document.getElementsByClassName(loadingClass);
    for (var i = 0; i < loadingElems.length; i += 1) {
      loadingElems[i].classList.remove(loadingClass);
    }
  }

  function removeElement(element) {
    element.parentNode.removeChild(element);
  }

  module.exports = {
    removeLoadingClass: removeLoadingClass,
    removeElement: removeElement
  };

}());
