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

    it("adds elements", function() {
      util.addElement(container, "div");
      util.addElement(container, "h1");
      assert.ok(container.innerHTML === "<div></div><h1></h1>");
    });

    it("removes elements", function() {
      var elem = util.addElement(container, "div");
      util.removeElement(elem);
      checkContainerIsEmpty(container);
    });

    it("adds elements with classes", function() {
      var classes = [ "class1", "class2", "class3" ];
      var options = { classes: classes };
      var elem = util.addElement(container, "div", options);
      for (var i = 0; i < elem.classList.length; i += 1) {
        assert.equal(elem.classList[i], classes[i]);
      }
    });

    it("adds elements with an id", function() {
      var id = "id1";
      var elem = util.addElement(container, "div", { id: id });
      var fetchedElem = document.getElementById(id);
      assert.equal(fetchedElem, elem);
    });

    it("hides loading elements", function() {
      var loadingClass = constants.cssClasses.loading;
      var elem = createLoadingElement();
      var loadingElements = document.getElementsByClassName(loadingClass);
      assert.ok(loadingElements.length > 0);
      util.removeLoadingClass(elem);
      assert.ok(loadingElements.length === 0);

      function createLoadingElement() {
        var loading = document.createElement("div");
        loading.classList.add(loadingClass);
        container.appendChild(loading);
        return loading;
      }
    });
  });

  function checkContainerIsEmpty(container) {
    assert.notOk(container.innerHTML);
  }

}());
