// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("../util");

  function addAudioContent(container, srcAttr, labelText) {
    var audioLabel = util.addElement(container, "div",
      { classes: ["label"] });
    audioLabel.innerHTML = labelText;
    var audioClasses = [ "audio" ];
    var audioElem = util.addElement(container, "audio",
      { classes: audioClasses });
    audioElem.setAttribute("src", srcAttr);
    var playing = false;
    audioLabel.addEventListener("click", function() {
      if (playing) {
        audioElem.pause();
        playing = false;
        console.log("SHOW PLAY ICON");
        return;
      }
      audioElem.play();
      playing = true;
      console.log("SHOW PAUSE ICON");
    });

    audioElem.addEventListener("ended", function() {
      playing = false;
      console.log("SHOW PLAY ICON");
    });
    return audioLabel;
  }

  module.exports = {
    addAudioContent: addAudioContent
  };

}());
