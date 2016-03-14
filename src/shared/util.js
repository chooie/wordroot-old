// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt
// for details.
(function() {
  "use strict";

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  module.exports = {
    capitalizeFirstLetter: capitalizeFirstLetter
  };

}());
