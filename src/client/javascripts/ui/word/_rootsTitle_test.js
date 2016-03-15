// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../../shared/assert");

  var util = require("./../util");
  var testUtil = require("./../testUtil");
  var rootsTitle = require("./rootsTitle");
  var constants = require("../../constants");

  describe("Roots Title", function() {
    var container;

    beforeEach(function() {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(function() {
      util.removeElement(container);
    });

    it("puts root parts", function() {
      var parts = [
        { part: "hasRoot1", hasRoot: true },
        { part: "notHasRoot", hasRoot: false },
        { part: "hasRoot2", hasRoot: true }
      ];
      rootsTitle.addRootParts(container, parts);
      parts.forEach(function(part) {
        testUtil.assertStringInElement(container, part.part, part.part);
      });
      var elemClass = constants.cssClasses.rootPart;
      var rootPartElems = document.querySelectorAll("." + elemClass);
      assert.equal(rootPartElems.length, 2, "Correct number of root elems");
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
      rootsTitle.addRoots(container, roots);
      roots.forEach(function(root) {
        testUtil.assertStringInElement(container, root.word,
          "word - " + root.word);
        testUtil.assertStringInElement(container, root.meaning, "meaning - " +
          root.meaning);
        testUtil.assertStringInElement(container, root.language, "language -" +
          root.language);
      });
    });
  });

}());
