// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");

  var wordPage = require("./wordPage");
  var util = require("./util");
  var testUtil = require("./testUtil");

  describe("Word Page", function() {
    var container;

    beforeEach(function() {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(function() {
      util.removeElement(container);
    });

    it.skip("puts title", function() {
      var rootParts = [ "some", "root", "parts" ];
      var roots = [];
      for (var i = 0; i < 3; i += 1) {
        var num = i + 1;
        roots.push({
          word: "word" + num,
          meaning: "meaning" + num,
          language: "lang" + num
        });
      }
      wordPage.addTitle(container, rootParts, roots);
      var activeElem = document.querySelector(".title .active");
      assert.ok(activeElem);
    });

    it("puts meaning", function() {
      var MEANING = "DEFAULT MEANING";
      wordPage.addMeaning(container, MEANING);
      testUtil.assertStringInElement(container, MEANING);
    });
  });

}());
