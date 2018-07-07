/*jslint browser: true */

(function() {
  "use strict";
  var originalTitle = document.title,
      originalURL   = document.location.href.replace(document.location.search, "") + "?name=",
      qShareURL     = document.querySelector("section a");


  /**
   * Generate a sharing URL.
   * @param {String} name The person's name.
   */
  function makeShareLink(name) {
    qShareURL.innerHTML = originalURL + decodeURIComponent(name);
    qShareURL.href = originalURL + encodeURIComponent(name);
  }

  /**
   * Update the page title with the person's name.
   * @param {String} name The person's name.
   */
  function updatePageTitle(name) {
    document.title = `${decodeURIComponent(name)} ${originalTitle}`;
  }

  // Initial setup of the share link
  qShareURL.innerHTML = originalURL;
  qShareURL.href = originalURL;

  // Update everything on keypress
  document.querySelector("header input").addEventListener("input", function() {
    updatePageTitle(this.value);
    makeShareLink(this.value);
  });

  window.onload = function() {
    var qs = window.location.search;

    // No query string was given
    if (!/^\?name=.+?$/.test(qs)) {
      return false;
    }

    // Get just the name and update all displays
    var name = qs.split("=")[1];
    updatePageTitle(name);
    makeShareLink(name);
    document.querySelector("header input").value = decodeURIComponent(name);

    // Test for HTML5 audio compatibility, preferring MP3 audio
    // Taken from http://diveintohtml5.info/everything.html#audio-mp3
    var _a = document.createElement("audio");
    var audioFile = (!!(_a.canPlayType && _a.canPlayType("audio/mpeg;").replace(/no/, ""))) ?
        "audio/congratulations.mp3" : "audio/congratulations.ogg";

    var congrats = new Audio(audioFile);
    congrats.load();
    congrats.play();
  };
}());
