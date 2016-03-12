// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var Q = require("../../../shared/promise");

  var Word = require("./Word");

  function make() {
    return Q.fcall(function() {
      var deferred = Q.defer();
      // TODO: Replace fake async call for real implementation
      var word = new Word();
      setTimeout(function() {
        deferred.resolve(word);
      }, 0);
      return deferred.promise;
    });
  }

  module.exports = {
    make: make
  };

}());
