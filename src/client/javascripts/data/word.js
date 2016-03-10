// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  var testWord = require("./testWord");

  module.exports.make = make;

  function Word() {
    this.info = testWord;
    this.getMeaning = function() {
      var meaning = this.info.meaning;
      return capitalizeFirstLetter(meaning);

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    };

    this.getRoots = function() {
      var roots = [];
      this.info.roots.forEach(function(root) {
        roots.push(root.root);
      });
      return roots;
    };

    this.getRootParts = function() {
      var parts = [];
      this.info.roots.forEach(function(root) {
        parts.push(root.part);
      });
      return parts;
    };
  }

  function make() {
    return Q.fcall(function() {
      var deferred = Q.defer();
      // TODO: Replace fake async call for real implementation
      var word = new Word();
      setTimeout(function() {
        deferred.resolve(word);
      }, 0);
      return deferred.promise;
    });
  }

}());
