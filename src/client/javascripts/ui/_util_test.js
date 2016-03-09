// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");

  var util = require("./util");
  var constants = require("./../constants");

  describe("UI Util", function() {
    var container;

    beforeEach(function() {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(function() {
      util.removeElement(container);
    });

    it("hides loading elements", function() {
      var loadingClass = constants.cssClasses.loading;
      createLoadingElement();

      var loadingElements = document.getElementsByClassName(loadingClass);
      assert.ok(loadingElements.length > 0);
      util.removeLoadingClass();
      assert.ok(loadingElements.length === 0);

      function createLoadingElement() {
        var loading = document.createElement("div");
        loading.classList.add(loadingClass);
        container.appendChild(loading);
      }
    });
  });

}());
