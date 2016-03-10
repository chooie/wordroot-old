// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var chai = require("../../vendor/chai-2.1.0");
  var chaiAsPromised = require("../../vendor/chai-as-promised-5.2.0");

  chai.use(chaiAsPromised);

  module.exports = chai.assert;

}());
