// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var testWord = require("./testWord");

  module.exports = [
    testWord,
    {
      word: "idiot",
      meaning: "a silly person",
      roots: [
        {
          part: "idio",
          root: {
            word: "idios",
            meaning: "private",
            language: "Greek"
          }
        },
        {
          part: "t"
        }
      ]
    }
  ];

}());
