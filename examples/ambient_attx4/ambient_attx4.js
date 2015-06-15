"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    tessel: { adaptor: "tessel", port: "A" }
  },

  devices: {
    ambient: { driver: "ambient-attx4" }
  },

  work: function(my) {
    my.ambient.on("error", function(err) {
      console.log(err);
    });

    my.ambient.on("light", function(data) {
      console.log("Light stream: " + data);
    });

    my.ambient.on("sound", function(data) {
      console.log("Sound stream: " + data);
    });

    every((1).seconds(), function() {
      my.ambient.getLightLevel(function(err, data) {
        if (err) { console.error(err); }
        console.log("Current Light level: " + data);
      });

      my.ambient.getSoundLevel(function(err, data) {
        if (err) { console.error(err); }
        console.log("Current Sound level:  " + data);
      });
    });
  }
}).start();
