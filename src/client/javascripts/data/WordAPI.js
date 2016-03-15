// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  var Word = require("./Word");
  var testWords = require("./testWords");

  function make(word) {
    var deferred = Q.defer();
    if (!word) {
      deferred.reject(new Error("Must provide word id"));
    } else {
      // TODO: Replace fake async call for real implementation
      var index = getIndexOfWord(word, testWords);
      var wordObj = new Word(testWords[index]);
      setTimeout(function() {
        deferred.resolve(wordObj);
      }, 0);
    }
    return deferred.promise;

    function getIndexOfWord(word, words) {
      for (var i = 0; i < words.length; i += 1) {
        if (words[i].word === word) {
          return i;
        }
      }
      throw new WordNotFoundError(word);
    }
  }

  function list() {
    var deferred = Q.defer();
    setTimeout(function() {
      var words = [];
      testWords.forEach(function(word) {
        words.push(word.word);
      });
      deferred.resolve(words);
    }, 0);
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
