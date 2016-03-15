// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  module.exports = {
    word: "thisisareallylongword",
    meaning: "some meaning about a really long word",
    roots: [
      {
        part: "this",
        root: {
          word: "root1",
          meaning: "meaning1",
          language: "lang1"
        }
      },
      {
        part: "is",
      },
      {
        part: "a",
      },
      {
        part: "really",
        root: {
          word: "root2",
          meaning: "meaning2",
          language: "lang2"
        }
      },
      {
        part: "long"
      },
      {
        part: "word",
        root: {
          word: "root3",
          meaning: "meaning3",
          language: "lang3"
        }
      }
    ]
  };

}());
