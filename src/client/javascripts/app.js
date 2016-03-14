// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../shared/promise");
  var classList = require("../../../vendor/classList");

  var wordAPI = require("./data/WordAPI");
  var wordPage = require("./ui/wordPage");
  var uiUtil = require("./ui/util");
  var constants = require("./constants");

  classList.shim();

  function setUpPage(appContainer, wordId) {
    if (!appContainer) throw Error("No app element in page");
    var startTime = Date.now();

    wordAPI.make(wordId)
    .then(function(word) {
      fillWordPage(appContainer, word);
      return wait(calculateTimeToDelay(startTime, Date.now()));
    })
    .then(function() {
      uiUtil.removeLoadingClass();
    })
    .catch(function(err) {
      console.log(err);
      // TODO: Add an error message to UI
    });
  }

  function fillWordPage(appContainer, word) {
    var container = document.createElement("div");
    wordPage.addTitle(container, word.getRootParts(), word.getRoots());
    wordPage.addMeaning(container, word.getMeaning());
    appContainer.appendChild(container);
  }

  function calculateTimeToDelay(before, after) {
    var minDelayTime = constants.misc.loading;
    var elapsedTime = after - before;
    var actualDelayTime = minDelayTime - elapsedTime;
    return actualDelayTime < 0 ? 0 : actualDelayTime;
  }

  function wait(delayTime) {
    var deferred = Q.defer();
    setTimeout(function() {
      deferred.resolve();
    }, delayTime);
    return deferred.promise;
  }

  module.exports = {
    setUpPage: setUpPage
  };

}());
