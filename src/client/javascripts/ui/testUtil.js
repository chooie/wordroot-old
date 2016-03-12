// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var assert = require("../../../shared/assert");

  function assertStringInElement(element, string, message) {
    var elementStr = element.innerHTML;
    assert.ok(elementStr.indexOf(string) > -1, message);
  }

  module.exports = {
    assertStringInElement: assertStringInElement
  };

}());
