// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("../util");

  function addAudioContent(container, srcAttr, labelText) {
    addAudioLabel(container, labelText);
    var audioElem = addAudioElem(container, srcAttr);
    var audioUIControl = addAudioUIControl(container);
    audioController(audioUIControl, audioElem);

    function addAudioLabel(container, labelText) {
      var options = { classes: [ "label" ] };
      var audioLabel = util.addElement(container, "div", options);
      audioLabel.innerHTML = labelText;
      return audioLabel;
    }

    function addAudioElem(container, srcAttr) {
      var options = { classes: [ "audio" ] };
      var audioElem = util.addElement(container, "audio", options);
      audioElem.setAttribute("src", srcAttr);
      return audioElem;
    }

    function addAudioUIControl(container) {
      var options = { classes: [ "fa", "fa-3x", "fa-play-circle" ] };
      var audioUIControlElem = util.addElement(container, "div", options);
      return audioUIControlElem;
    }
  }

  function audioController(audioUIControl, audioElem) {
    audioUIControl.addEventListener(
      "click",
      clickHandler.bind(null, audioElem, audioUIControl)
    );

    audioElem.addEventListener("ended", function() {
      console.log("SHOW PLAY ICON");
    });
  }

  function clickHandler(audioElem) {
    if (!audioElem.paused) {
      pause(audioElem);
    } else {
      play(audioElem);
    }
  }

  function pause(audioElem) {
    audioElem.pause();
    console.log("SHOW PLAY ICON");
  }
  function play(audioElem) {
    audioElem.play();
    console.log("SHOW PAUSE ICON");
  }

  module.exports = {
    addAudioContent: addAudioContent
  };

}());
