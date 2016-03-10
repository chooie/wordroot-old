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
    wordUtil.make()
    .then(fillWordPage.bind(null, startTime, appContainer));
  }

  function fillWordPage(startTime, appContainer, wordObj) {
    var container = document.createElement("div");
    Q.all([
      wordPage.populateCompositeRootPartsTitle(
        container, wordObj.getRootParts()
      ),
      wordPage.populateMeaning(container, wordObj.getMeaning())
    ])
    .then(function() {
      appContainer.appendChild(container);
      var delay = calculateTimeToDelay(startTime, Date.now());
      callAfterDelay(delay, uiUtil.removeLoadingClass);
    })
    .fail(function(error) {
      throw new Error(error);
    });
  }

  function calculateTimeToDelay(before, after) {
    var minDelayTime = constants.misc.loading;
    var elapsedTime = after - before;
    var actualDelayTime = minDelayTime - elapsedTime;
    return actualDelayTime < 0 ? 0 : actualDelayTime;
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
