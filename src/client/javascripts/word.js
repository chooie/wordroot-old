// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  module.exports.getWord = getWord;

  function getWord() {
    return {
      word: "autobiography",
      meaning: "the story that someone writes about their own life",
      roots: [
        {
          word: "autos",
          meaning: "self",
          language: "Greek"
        },
        {
          word: "bios",
          meaning: "life",
          language: "Greek"
        },
        {
          word: "graphein",
          meaning: "to write",
          language: "Greek"
        }
      ]
    };
  }

}());
