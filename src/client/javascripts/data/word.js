// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("../../../shared/util");

  module.exports = Word;

  function Word(info) {
    if (!info) throw new Error("Must provide an info object");

    this.info = info;
    this.getMeaning = function() {
      var meaning = this.info.meaning;
      return util.capitalizeFirstLetter(meaning);
    };

    this.getRoots = function() {
      var roots = [];
      this.info.roots.forEach(function(root) {
        if (root.root) {
          return roots.push(root.root);
        }
        roots.push(undefined);
      });
      return roots;
    };

    this.getRootParts = function() {
      var parts = [];
      var roots = this.getRoots();
      this.info.roots.forEach(function(root, i) {
        var part = { part: root.part };
        if (roots[i]) {
          part.hasRoot = true;
        } else {
          part.hasRoot = false;
        }
        parts.push(part);
      });
      return parts;
    };
  }

}());
