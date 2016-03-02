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
    populateTitle(app);
    populateMeaning(app);
  }

  function populateTitle(container) {
    putElement(container, "div" , function(element) {
      createHeader(element);
    });

    function createHeader(container) {
      putElement(container, "h1", function(element) {
        var _word = word.getWord();
        element.innerHTML = _word.word;
      });
    }
  }

  function populateMeaning(container) {
    putElement(container, "div", function(element) {
      createMeaning(element);
    });

    function createMeaning(container) {
      putElement(container, "p", function(element) {
        var _word = word.getWord();
        element.innerHTML = _word.meaning;
      });
    }
  }

  function putElement(container, elementType, callback) {
    var element = document.createElement(elementType);
    callback(element);
    container.appendChild(element);
  }

  module.exports = {
    populateTitle: populateTitle,
    populateMeaning: populateMeaning
  };

}());
