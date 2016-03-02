// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var word = require("./word");

  document.addEventListener("DOMContentLoaded", function() {
    setUpPage();
  });

  function setUpPage() {
    var app = document.getElementById("app");
    populateTitleDiv(app);
  }

  function populateTitleDiv(container) {
    var title = document.createElement("div");
    createHeader(title);
    container.appendChild(title);
  }

  function createHeader(container) {
    var header = document.createElement("h1");
    var _word = word.getWord();
    header.innerHTML = _word.word;
    container.appendChild(header);
    return header;
  }

  module.exports.run = function(container) {
    populateTitleDiv(container);
  };

}());
