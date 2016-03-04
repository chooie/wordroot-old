// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var shell = require("shelljs");
  var browserify = require("../../util/browserify_runner");

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
      browserify.bundle({
        entry: paths.clientEntryPoint,
        outfile: paths.clientDistBundle,
        options: {
          standalone: "example",
          debug: true
        }
      }, complete, fail);
    }, { async: true });

    task("buildServer", function() {
      console.log("Copying server code: .");
      shell.cp("-R", paths.serverDir, paths.serverEntryPoint, paths.distDir);
    });
  };

}());
