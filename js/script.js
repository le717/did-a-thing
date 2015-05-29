/*jslint browser: true */

(function() {
  "use strict";
  var originalTitle = document.title,
      //            originalURL   = document.location.origin + "?name=",
      originalURL   = document.location.href.replace(document.location.search, "") + "?name=",
      QshareURL     = document.querySelector("section a"),
      decode        = {},
      encode        = {
        " " : "%20",
        "&" : "%26",
        "'" : "%27",
        "\"": "%22",
      };

  // Create the decoding object
  for (var k in encode) {
    if (encode.hasOwnProperty(k)) {
      decode[encode[k]] = k;
    }
  }

  /**
   * Encode URL escape characters in a person's name.
   * @param {String} name The person's name.
   * @returns {String}
   */
  function encodeName(name) {
    for (var i = 0, len = name.length; i < len; i++) {
      var letter = name[i];

      if (encode[letter] !== undefined) {
        name = name.replace(letter, encode[letter]);
      }
    }
    return name;
  }

  /**
   * Decode URL escape characters in a person's name.
   * @param {String} name The person's name.
   * @returns {String}
   */
  function decodeName(name) {
    for (var k in decode) {
      if (decode.hasOwnProperty(k)) {
        name = name.replace(k, decode[k]);
      }
    }
    return name;
  }

  /**
   * Generate a sharing URL.
   * @param {String} name The person's name.
   */
  function makeShareLink(name) {
    QshareURL.innerHTML = originalURL + decodeName(name);
    QshareURL.href = originalURL + encodeName(name);
  }

  /**
   * Update the page title with the person's name.
   * @param {String} name The person's name.
   */
  function updatePageTitle(name) {
    document.title = decodeName(name) + " " + originalTitle;
  }

  // Initial setup of the share link
  QshareURL.innerHTML = originalURL;
  QshareURL.href = originalURL;

  // Update everything on keypress
  document.querySelector("header input").addEventListener("input", function() {
    updatePageTitle(this.value);
    makeShareLink(this.value);
  });

  window.onload = function() {
    var qs = window.location.search;

    // No query string was given
    if (!/\?name=.+?$/.test(qs)) {
      return false;
    }

    // Get just the name and update all displays
    var name = qs.split("=")[1];
    updatePageTitle(name);
    makeShareLink(name);
    document.querySelector("header input").value = decodeName(name);
  };
}());
