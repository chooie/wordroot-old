// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./util");

  function addDirectory(container, words) {
    var directory = util.addElement(container);
    words.forEach(function(word) {
      var elem = util.addElement(container, "p");
      elem.innerHTML = word;
    });
    return directory;
  }

  module.exports = {
    addDirectory: addDirectory
  };

}());
