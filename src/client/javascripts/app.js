// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var wordUtil = require("./word");
  var Q = require("../../shared/promise");

  document.addEventListener("DOMContentLoaded", function() {
    setUpPage();
  });

  function setUpPage() {
    var app = document.getElementById("app");
    var container = document.createElement("div");
    Q.all([
      populateTitle(container),
      populateMeaning(container)
    ])
    .then(function() {
      app.appendChild(container);
    });
  }

  function populateTitle(container) {
    return Q.fcall(function() {
      var div = putElement(container, "div");
      createHeader(div);

      function createHeader(container) {
        var header = putElement(container, "h1");
        wordUtil.getWord()
        .then(function(word) {
          header.innerHTML = word.word;
        });
      }
    });
  }

  function populateMeaning(container) {
    return Q.fcall(function() {
      var div = putElement(container, "div");
      createMeaning(div);

      function createMeaning(container) {
        var p = putElement(container, "p");
        wordUtil.getWord()
        .then(function(word) {
          p.innerHTML = word.meaning;
        });
      }
    });
  }

  function putElement(container, elementType) {
    var element = document.createElement(elementType);
    container.appendChild(element);
    return element;
  }

  module.exports = {
    populateTitle: populateTitle,
    populateMeaning: populateMeaning
  };

}());
