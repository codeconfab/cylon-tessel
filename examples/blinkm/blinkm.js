"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "A" }
  },

  devices: {
    blinkm: { driver: "blinkm" }
  },

  work: function(my) {
    my.blinkm.stopScript();

    my.blinkm.getFirmware(function(err, version) {
      if (err) { console.error(err); }
      console.log("Started BlinkM version " + version);
    });

    my.blinkm.goToRGB(0, 0, 0);

    my.blinkm.getRGBColor(function(err, data) {
      if (err) { console.error(err); }
      console.log("Starting Color: ", data);
    });

    every((2).second(), function() {
      my.blinkm.getRGBColor(function(err, data) {
        if (err) { console.error(err); }
        console.log("Current Color: ", data);
      });

      my.blinkm.fadeToRandomRGB(128, 128, 128);
    });
  }
}).start();
