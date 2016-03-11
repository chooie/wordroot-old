// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");

  var wordPage = require("./wordPage");
  var util = require("./util");
  var constants = require("../constants");

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

    it("puts root parts", function() {
      var roots = [ "some", "root", "parts" ];
      wordPage.addRootParts(container, roots);
      roots.forEach(function(root) {
        assertStringInElement(container, root);
      });
      var elemClass = constants.cssClasses.rootPart;
      var rootPartElems = document.querySelectorAll("." + elemClass);
      assert.ok(rootPartElems.length === 3, "Correct number of root elems");
    });

    it("puts root info", function() {
      var roots = [];
      for (var i = 0; i < 3; i += 1) {
        var num = i + 1;
        roots.push({
          word: "word" + num,
          meaning: "meaning" + num,
          language: "lang" + num
        });
      }
      wordPage.addRoots(container, roots);
      roots.forEach(function(root) {
        assertStringInElement(container, root.word, "word - " + root.word);
        assertStringInElement(container, root.meaning, "meaning - " +
          root.meaning);
        assertStringInElement(container, root.language, "language -" +
          root.language);
      });
    });

    it("puts meaning", function() {
      var MEANING = "DEFAULT MEANING";
      wordPage.addMeaning(container, MEANING);
      assertStringInElement(container, MEANING);
    });
  });

  function assertStringInElement(element, string, message) {
    var elementStr = element.innerHTML;
    assert.ok(elementStr.indexOf(string) > -1, message);
  }

}());
