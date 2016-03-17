// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../shared/promise");
  var classList = require("../../../vendor/classList");

  var Router = require("./Router");
  var wordDirectory = require("./ui/wordDirectory");
  var page = require("./page");
  var wordAPI = require("./data/WordAPI");
  var uiUtil = require("./ui/util");
  var constants = require("./constants");

  classList.shim();

  function run(/*container*/) {
    wordAPI.list()
    .then(function(words) {
      var router = new Router();
      var pageContainer = document.getElementById("page");
      var loadingContainer = document.getElementById("loading-main");
      var navContainer = document.querySelector("#word-nav");
      var routes = [];
      words.forEach(function(word) {
        var route = {
          name: word,
          handler: setUpPage.bind(null, pageContainer, word)
        };
        routes.push(route);
      });
      var startTime;
      var before = function() {
        startTime = Date.now();
        uiUtil.addLoadingClass(loadingContainer);
      };
      var after = function() {
        wait(calculateTimeToDelay(startTime, Date.now()))
        .then(function() {
          uiUtil.removeLoadingClass(loadingContainer);
        });
      };
      router.initialise({ routes: routes, before: before, after: after });
      wordDirectory.addDirectory(navContainer, router);
      router.navigateTo(words[0]);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function setUpPage(appContainer, wordId) {
    if (!appContainer) throw Error("No app element in page");
    appContainer.innerHTML = "";

    wordAPI.make(wordId)
    .then(function(word) {
      page.fillWordPage(appContainer, word);
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
