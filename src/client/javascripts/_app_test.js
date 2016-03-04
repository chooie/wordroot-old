// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../shared/assert");

  var app = require("./app");
  var wordUtil = require("./word");
  var constants = require("./constants");

  describe("App", function() {
    var container;
    var word;

    beforeEach(function(done) {
      container = document.createElement("div");
      document.body.appendChild(container);
      wordUtil.getWord()
      .then(function(data) {
        word = data;
        done();
      });
    });

    it("hides loading elements", function() {
      var loadingClass = constants.cssClasses.loading;
      createLoadingElement();

      var loadingElements = document.getElementsByClassName(loadingClass);
      assert.ok(loadingElements.length > 0);
      app.removeLoading();
      assert.ok(loadingElements.length === 0);

      function createLoadingElement() {
        var loading = document.createElement("div");
        loading.classList.add(loadingClass);
        container.appendChild(loading);
      }
    });

    it("populates title composed of root parts", function() {
      app.populateTitle(container)
      .then(function() {
        assertStringInElement(container, "autobiography");
      });
    });

    it("populates meaning", function() {
      app.populateMeaning(container)
      .then(function() {
        assertStringInElement(container, "the story");
      });
    });
  });

  function assertStringInElement(element, string) {
    var elementStr = element.innerHTML;
    assert.ok(elementStr.indexOf(string) > -1);
  }

}());
