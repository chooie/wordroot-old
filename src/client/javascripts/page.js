// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var wordPage = require("./ui/word/wordPage");

  function fillWordPage(appContainer, word) {
    var container = document.createElement("div");
    wordPage.addTitle(container, word.getRootParts(), word.getRoots());
    wordPage.addMeaning(container, word.getMeaning());
    appContainer.appendChild(container);
  }

  module.exports = {
    fillWordPage: fillWordPage
  };

}());
