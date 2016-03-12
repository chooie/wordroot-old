// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");

  var util = require("./util");
  var revealer = require("./revealer");

  describe("Revealer", function() {
    var container;

    beforeEach(function() {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(function() {
      util.removeElement(container);
    });

    it("hides all elements on initialisation", function() {
      var elem1 = util.addElement(container, "div");
      var elem2 = util.addElement(container, "div");
      var elem3 = util.addElement(container, "div");

      revealer.initialise([], [elem1, elem2, elem3]);

      assert.ok(elem1.classList.contains("hide"));
      assert.ok(elem2.classList.contains("hide"));
      assert.ok(elem3.classList.contains("hide"));
    });

    it("reveals an element and makes clicked active", function() {
      var clicked = util.addElement(container, "div");
      var toReveal = util.addElement(container, "div");
      var toNotReveal1 = util.addElement(container, "div");
      var toNotReveal2 = util.addElement(container, "div");
      var reveals = [ toReveal, toNotReveal1, toNotReveal2 ];
      revealer.showElement(clicked, 0, [ clicked ], reveals);
      assert.ok(clicked.classList.contains("active"));
      assert.ok(toReveal.classList.contains("active"));
    });

    it("reveals an element when another is clicked", function() {
      var toClick = util.addElement(container, "div");
      var toNotClick1 = util.addElement(container, "div");
      var toNotClick2 = util.addElement(container, "div");

      var toReveal = util.addElement(container, "div");
      var toNotReveal1 = util.addElement(container, "div");
      var toNotReveal2 = util.addElement(container, "div");

      var clicks = [ toClick, toNotClick1, toNotClick2 ];
      var reveals = [ toReveal, toNotReveal1, toNotReveal2 ];

      revealer.initialise(clicks, reveals);

      toClick.click();

      assert.ok(toReveal.classList.contains("active"));
      assert.notOk(toReveal.classList.contains("hide"));
    });

    it("reveals an element and then hides it when clicked again", function() {
      var toClick = util.addElement(container, "div");
      var toNotClick1 = util.addElement(container, "div");
      var toNotClick2 = util.addElement(container, "div");

      var toReveal = util.addElement(container, "div");
      var toNotReveal1 = util.addElement(container, "div");
      var toNotReveal2 = util.addElement(container, "div");

      var clicks = [ toClick, toNotClick1, toNotClick2 ];
      var reveals = [ toReveal, toNotReveal1, toNotReveal2 ];

      revealer.initialise(clicks, reveals);

      toClick.click();
      toClick.click();

      assert.ok(toReveal.classList.contains("hide"));
    });
  });

}());
