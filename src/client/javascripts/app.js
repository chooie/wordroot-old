// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../shared/promise");

  var wordUtil = require("./word");
  var constants = require("./constants");

  document.addEventListener("DOMContentLoaded", function() {
    var app = document.getElementById("app");
    if (app) {
      setUpPage(app);
    }
  });

  function setUpPage(app) {
    if (!app) throw Error("No app element in page");
    var container = document.createElement("div");
    var before = Date.now();
    Q.all([
      populateTitle(container),
      populateMeaning(container)
    ])
    .then(function() {
      app.appendChild(container);
      var after = Date.now();
      var actualLoadingTime = calculateLoadingTime(before, after);

      setTimeout(function() {
        removeLoading();
      }, actualLoadingTime);

      function calculateLoadingTime(before, after) {
        var minLoadingTime = constants.misc.loading;
        var timeTakenToLoadAll = after - before;
        var actualLoadingTime = minLoadingTime - timeTakenToLoadAll;
        return actualLoadingTime < 0 ? 0 : actualLoadingTime;
      }
    });
  }

  function removeLoading() {
    var loadingClass = constants.cssClasses.loading;
    var loadingElems = document.getElementsByClassName(loadingClass);
    for (var i = 0; i < loadingElems.length; i += 1) {
      loadingElems[i].classList.remove(loadingClass);
    }
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
    populateMeaning: populateMeaning,
    removeLoading: removeLoading
  };

}());
