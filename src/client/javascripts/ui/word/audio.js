// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("../util");

  var UI_CONTROL_BASE_CLASSES = [ "fa", "fa-3x" ];

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
      var classes = UI_CONTROL_BASE_CLASSES.slice();
      classes.push("fa-play-circle");
      var options = { classes: classes };
      var audioUIControlElem = util.addElement(container, "div", options);
      return audioUIControlElem;
    }
  }

  function setUIState(uiControl, state) {
    var classes = {
      "playing": "fa-pause-circle",
      "paused": "fa-play-circle"
    };

    var classKeys = Object.keys(classes);

    classKeys.forEach(function(key) {
      uiControl.classList.remove(classes[key]);
    });

    uiControl.classList.add(classes[state]);
  }

  function audioController(audioUIControl, audioElem) {
    audioUIControl.addEventListener(
      "click",
      clickHandler.bind(null, audioElem, audioUIControl)
    );

    audioElem.addEventListener("ended", function() {
      setUIState(audioUIControl, "paused");
    });
  }

  function clickHandler(audioElem, audioUIControl) {
    if (!audioElem.paused) {
      pause(audioElem, audioUIControl);
    } else {
      play(audioElem, audioUIControl);
    }
  }

  function pause(audioElem, audioUIControl) {
    audioElem.pause();
    setUIState(audioUIControl, "paused");
  }
  function play(audioElem, audioUIControl) {
    audioElem.play();
    setUIState(audioUIControl, "playing");
  }

  module.exports = {
    addAudioContent: addAudioContent
  };

}());
