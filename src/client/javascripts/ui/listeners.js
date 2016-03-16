// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  function preventDoubleClickHighlight(elem) {
    elem.addEventListener("dragstart", function(e) {
      e.preventDefault();
    });
    elem.addEventListener("selectstart", function(e) {
      e.preventDefault();
    });
  }

  module.exports = {
    preventDoubleClickHighlight: preventDoubleClickHighlight
  };

}());
