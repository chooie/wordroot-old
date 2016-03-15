// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  function initialise(clickElems, revealElems) {
    revealElems.forEach(function(reveal) {
      if (reveal) {
        reveal.classList.add("hide");
      }
    });

    clickElems.forEach(function(clickElem, index) {
      clickElem.addEventListener("click", function() {
        if (revealElems[index]) {
          showElement(clickElem, index, clickElems, revealElems);
        }
      });
      preventDoubleClickHighlight(clickElem);

      function preventDoubleClickHighlight(elem) {
        elem.addEventListener("dragstart", function(e) {
          e.preventDefault();
        });
        elem.addEventListener("selectstart", function(e) {
          e.preventDefault();
        });
      }
    });
  }

  function showElement(clickElem, index, clickElems, revealElems) {
    var toShow = revealElems[index];
    var alreadyClicked = false;

    if (toShow.classList.contains("active")) {
      alreadyClicked = true;
    }

    clickElems.forEach(function(elem) {
      elem.classList.remove("active");
    });

    revealElems.forEach(function(elem) {
      if (elem) {
        elem.classList.remove("active");
      }
    });
    revealElems.forEach(function(elem) {
      if (elem) {
        elem.classList.add("hide");
      }
    });

    if (!alreadyClicked) {
      clickElem.classList.add("active");

      toShow.classList.add("active");
      toShow.classList.remove("hide");
    }
  }

  module.exports = {
    initialise: initialise,
    showElement: showElement
  };

}());
