// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  var Word = require("./Word");

  function make(word) {
    var deferred = Q.defer();
    if (!word) {
      deferred.reject(new Error("Must provide word id"));
    } else {
      var request = new XMLHttpRequest();
      request.open("GET", "/word/" + word, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText);
          var wordObj = new Word(data);
          deferred.resolve(wordObj);
        } else {
          // We reached our target server, but it returned an error
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
    }
    return deferred.promise;
  }

  function list() {
    var deferred = Q.defer();
    var request = new XMLHttpRequest();
    request.open("GET", "/words", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        deferred.resolve(data);
      } else {
        // We reached our target server, but it returned an error
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
    return deferred.promise;
  }

  function WordNotFoundError(word) {
    this.name = "WordNotFoundError";
    var wordInfo = word || "Word";
    this.message = wordInfo + " doesn't exist";
    this.stack = (new Error()).stack;
  }
  WordNotFoundError.prototype = Object.create(Error.prototype);
  WordNotFoundError.prototype.constructor = WordNotFoundError;


  module.exports = {
    make: make,
    list: list
  };

}());
