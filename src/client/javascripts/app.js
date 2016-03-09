// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../shared/promise");
  var classList = require("../../../vendor/classList");

  var wordUtil = require("./data/word");
  var wordPage = require("./ui/wordPage");
  var uiUtil = require("./ui/util");
  var constants = require("./constants");

  classList.shim();

  function setUpPage(appContainer) {
    if (!appContainer) throw Error("No app element in page");
    var startTime = Date.now();
    wordUtil.getWord()
    .then(fillWordPage.bind(null, startTime, appContainer));
  }

  function fillWordPage(startTime, appContainer, word) {
    var container = document.createElement("div");
    wordPage.populateTitle(container, word.word);
    wordPage.populateMeaning(container, word.meaning);

    appContainer.appendChild(container);
    var endTime = Date.now();
    var actualLoadingTime = calculateLoadingTime(startTime, endTime);

    callAfterDelay(actualLoadingTime, uiUtil.removeLoadingClass);
  }

  function calculateLoadingTime(before, after) {
    var minLoadingTime = constants.misc.loading;
    var timeTakenToLoadAll = after - before;
    var actualLoadingTime = minLoadingTime - timeTakenToLoadAll;
    return actualLoadingTime < 0 ? 0 : actualLoadingTime;
  }

  function callAfterDelay(delayTime, callback) {
    var deferred = Q.defer();
    setTimeout(function() {
      callback();
      deferred.resolve();
    }, delayTime);
    return deferred.promise;
  }

  module.exports = {
    setUpPage: setUpPage
  };

}());
