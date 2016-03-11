// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  function initialise(clickElems, revealElems) {
    revealElems.forEach(function(reveal) {
      reveal.classList.add("hide");
    });

    clickElems.forEach(function(clickElem, index) {
      clickElem.addEventListener("click", function() {
        showElement(index, revealElems);
      });
    });
  }

  function showElement(index, elems) {
    var toShow = elems[index];
    var alreadyClicked = false;

    if (toShow.classList.contains("active")) {
      alreadyClicked = true;
    }

    elems.forEach(function(elem) {
      elem.classList.remove("active");
    });
    elems.forEach(function(elem) {
      elem.classList.add("hide");
    });

    if (!alreadyClicked) {
      toShow.classList.add("active");
      toShow.classList.remove("hide");
    }
  }

  module.exports = {
    initialise: initialise,
    showElement: showElement
  };

}());
