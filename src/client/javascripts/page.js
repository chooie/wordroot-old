// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var wordPage = require("./ui/word/wordPage");

  function fillWordPage(outerContainer, word) {
    var innerContainer = document.createElement("div");
    wordPage.addTitle(innerContainer, word.getRootParts(), word.getRoots());
    wordPage.addMeaning(innerContainer, word.getMeaning());
    outerContainer.appendChild(innerContainer);
  }

  module.exports = {
    fillWordPage: fillWordPage
  };

}());
