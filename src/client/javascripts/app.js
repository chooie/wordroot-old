// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../shared/promise");
  var classList = require("../../../vendor/classList");

  var Router = require("./Router");
  var page = require("./page");
  var wordAPI = require("./data/WordAPI");
  var uiUtil = require("./ui/util");
  var constants = require("./constants");

  classList.shim();

  function run(/*container*/) {
    var pageContainer = document.getElementById("page");
    var handler1 = setUpPage.bind(null, pageContainer, "thisisareallylongword");
    var handler2 = setUpPage.bind(null, pageContainer, "autobiography");
    var router = new Router();
    var routes = [
      { name: "route1", handler: handler1 },
      { name: "route2", handler: handler2 }
    ];
    router.initialise({ routes: routes });
    router.navigateTo("route1");
  }

  function setUpPage(appContainer, wordId) {
    if (!appContainer) throw Error("No app element in page");
    var startTime = Date.now();
    appContainer.innerHTML = "";

    wordAPI.make(wordId)
    .then(function(word) {
      page.fillWordPage(appContainer, word);
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
    run: run
  };

}());
