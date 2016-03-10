// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var misc = {};
  var loadingTime = 1000;
  misc.loading = loadingTime;

  var cssClasses = {};
  var loading = "loading";
  var rootPartTitle = "root-part-title";
  var rootPart = "root-part";
  cssClasses.loading = loading;
  cssClasses.rootPartTitle = rootPartTitle;
  cssClasses.rootPart = rootPart;

  module.exports = {
    misc: misc,
    cssClasses: cssClasses
  };

}());
