// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var misc = {};
  var loadingTime = 500;
  misc.loading = loadingTime;

  var cssClasses = {};
  var container = "container";
  var loading = "loading";
  var rootParts = "root-parts";
  var rootPart = "root-part";
  var meaning = "meaning";
  cssClasses.container = container;
  cssClasses.loading = loading;
  cssClasses.rootParts = rootParts;
  cssClasses.rootPart = rootPart;
  cssClasses.meaning = meaning;

  module.exports = {
    misc: misc,
    cssClasses: cssClasses
  };

}());
