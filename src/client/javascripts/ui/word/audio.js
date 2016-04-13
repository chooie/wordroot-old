// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("../util");

  function addAudioContent(container, srcAttr, labelText) {
    var audioState = { playing: false };
    var audioLabel = addAudioLabel(container, labelText);
    var audioElem = addAudioElem(container, srcAttr);
    addListeners(audioState, audioLabel, audioElem);
    return audioLabel;

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
  }

  function addListeners(audioState, audioLabel, audioElem) {
    audioLabel.addEventListener(
      "click",
      clickHandler.bind(null, audioState, audioElem)
    );

    audioElem.addEventListener("ended", function() {
      audioState.playing = false;
      console.log("SHOW PLAY ICON");
    });
  }

  function clickHandler(audioState, audioElem) {
    if (audioState.playing) {
      pause(audioElem, audioState);
    } else {
      play(audioElem, audioState);
    }
  }

  function pause(audioElem, audioState) {
    audioElem.pause();
    audioState.playing = false;
    console.log("SHOW PLAY ICON");
  }
  function play(audioElem, audioState) {
    audioElem.play();
    audioState.playing = true;
    console.log("SHOW PAUSE ICON");
  }

  module.exports = {
    addAudioContent: addAudioContent
  };

}());
