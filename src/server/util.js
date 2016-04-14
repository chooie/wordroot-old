// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var db = require("./db");

  function connectToDB() {
    var connection = db.createConnection({
      host: "localhost",
      user: "root",
      database: "wordroot"
    });
    connection.connect();
    return connection;
  }

  module.exports = {
    connectToDB: connectToDB
  };

}());
