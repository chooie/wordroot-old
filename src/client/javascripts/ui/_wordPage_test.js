// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");

  var wordPage = require("./wordPage");
  var util = require("./util");

  describe("Word Page", function() {
    var container;

    beforeEach(function() {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(function() {
      util.removeElement(container);
    });

    it("populates title", function(done) {
      var TITLE = "DEFAULT TITLE";
      wordPage.populateTitle(container, TITLE)
      .then(function() {
        assertStringInElement(container, TITLE);
        done();
      });
    });

    it("populates title composed of root parts", function(done) {
      var roots = [ "some", "root", "parts" ];
      wordPage.populateCompositeRootPartsTitle(container, roots)
      .then(function() {
        roots.forEach(function(root) {
          assertStringInElement(container, root);
          done();
        });
      });
    });

    it("populates meaning", function(done) {
      var MEANING = "DEFAULT MEANING";
      wordPage.populateMeaning(container, MEANING)
      .then(function() {
        assertStringInElement(container, MEANING);
        done();
      });
    });
  });

  function assertStringInElement(element, string) {
    var elementStr = element.innerHTML;
    assert.ok(elementStr.indexOf(string) > -1);
  }

}());
