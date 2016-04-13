// Copyright (c) 2016 Charles Hebert. All rights reserved. See LICENSE.txt 
// for details.
(function() {
  "use strict";

  var util = require("./../util");
  var css = require("../../constants").cssClasses;
  var rootsTitle = require("./rootsTitle");
  var revealer = require("./../revealer");

  function addTitle(container, rootParts, roots) {
    var options = { classes: [ css.container, "title" ] };
    var title = util.addElement(container, "div", options);
    var rootPartElems = rootsTitle.addRootParts(title, rootParts);
    var rootElems = rootsTitle.addRoots(title, roots);
    revealer.initialise(rootPartElems, rootElems);
    return title;
  }

  function addMeaning(container, meaning) {
    var classes = [ css.container, css.meaning ];
    var div = util.addElement(container, "div", { classes: classes });
    div.innerHTML = meaning;
    return div;
  }

  function addVideo(container, word) {
    var classes = [ css.container, "video-row" ];
    var div = util.addElement(container, "div", { classes: classes });

    makeVideo(div, word);

    return div;

    function makeVideo(container, word) {
      var video = util.addElement(container, "video", { classes: [ "video" ] });
      video.setAttribute("src", "content/videos/" + word + ".mp4");
      video.setAttribute("autoplay", true);
      video.setAttribute("loop", true);
      return video;
    }
  }

  function addAudio(container, word) {
    var classes = [ css.container, "audio-row" ];
    var div = util.addElement(container, "div", { classes: classes });

    var srcAttrSay = "content/audio/say/" + word + ".mp3";
    addAudioContent(div, srcAttrSay, "Say Word");

    var srcAttrTalk = "content/audio/talk/" + word + ".mp3";
    addAudioContent(div, srcAttrTalk, "Story about word");
    return div;

    function addAudioContent(container, srcAttr, labelText) {
      var audioLabel = util.addElement(container, "div", { classes: ["label"] });
      audioLabel.innerHTML = labelText;
      var audioClasses = [ "audio" ];
      var audioElem = util.addElement(container, "audio",
        { classes: audioClasses });
      audioElem.setAttribute("src", srcAttr);
      audioElem.setAttribute("controls", true);
      return audioLabel;
    }
  }

  module.exports = {
    addTitle: addTitle,
    addMeaning: addMeaning,
    addVideo: addVideo,
    addAudio: addAudio
  };

}());
