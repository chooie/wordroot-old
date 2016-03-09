// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var shell = require("shelljs");

  var paths = require("../../config/paths");

  module.exports = function() {
    desc("Build distribution package");
    task("build", [ "prepDistDir", "buildClient", "buildServer" ]);

    task("prepDistDir", function() {
      shell.rm("-rf", paths.distDir);
    });

    task("buildClient",
      [ paths.clientDistDir, "bundleClientJs" ],
      function() {
        console.log("Copying client code: .");
        shell.cp(
          paths.clientDir + "/*.html", paths.clientDir + "/*.css",
          paths.clientDistDir
        );

        shell.cp(
          "-R",
          paths.clientContentDir,
          paths.clientDistDir
        );
      }
    );

    task("bundleClientJs", [ paths.clientDistDir ], function() {
      console.log("Bundling browser code with Browserify: .");
      jake.exec(
        "node node_modules/browserify/bin/cmd.js -r ./" +
        paths.clientEntryPoint + ":WordRoot -o " + paths.clientDistBundle,
        { interactive: true },
        complete);
    }, { async: true });

    task("buildServer", function() {
      console.log("Copying server code: .");
      shell.cp("-R", paths.serverDir, paths.serverEntryPoint, paths.distDir);
    });
  };

}());
