// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../shared/promise");

  module.exports.getWord = getWord;

  function getWord() {
    var word = {
      word: "autobiography",
      meaning: "the story that someone writes about their own life",
      roots: [
        {
          part: "auto",
          root: {
            word: "autos",
            meaning: "self",
            language: "Greek"
          }
        },
        {
          part: "bio",
          root: {
            word: "bios",
            meaning: "life",
            language: "Greek"
          }
        },
        {
          part: "graphy",
          root: {
            word: "graphein",
            meaning: "to write",
            language: "Greek"
          }
        },
      ]
    };

    return Q.fcall(function() {
      var deferred = Q.defer();
      setTimeout(function() {
        deferred.resolve(word);
      }, 0);
      return deferred.promise;
    });
  }

}());
