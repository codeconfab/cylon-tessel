# Cylon.js For Tessel

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon adaptor for the [Tessel](https://tessel.io/) JavaScript microcontroller.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our
sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-tessel.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-tessel) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-tessel/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-tessel) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-tessel/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-tessel)

For more information about Cylon, check out our repo at
https://github.com/hybridgroup/cylon

## How to Install

Follow the installation instructions detailed [here](https://tessel.io/install/)

We've provided a repo containing an [example cylon-tessel project][example].

[example]: https://github.com/hybridgroup/cylon-example-tessel

    $ git clone https://github.com/hybridgroup/cylon-example-tessel.git my-tessel-project
    $ cd my-tessel-project
    $ npm install
    $ tessel run blink.js

If the blue light starts to blink, then you're all set!

## How to Use

### LED

This small program lets you toggle an LED on and off.

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    tessel: { adaptor: 'tessel' }
  },

  devices: {
    led: { driver: 'led', pin: 1 }
  },

  work: function(my) {
    every((1).seconds(), function() { my.led.toggle() });
  }
}).start();
```

### Climate

This small program shows how to use the Tessel Climate module.

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    tessel: { adaptor: 'tessel', port: 'A' }
  },

  devices: {
    climate: { driver: 'climate-si7005' }
  },

  work: function(my) {
    my.climate.on('error', function (err) {
      console.log(err)
    });

    every((1).seconds(), function() {
      my.climate.readHumidity(function (err, humid) {
        console.log('Humidity:', humid.toFixed(4) + '%RH');
      });
      my.climate.readTemperature('f', function (err, temp) {
        console.log('Degrees:', temp.toFixed(4) + 'F');
      });
    });
  }
}).start();
```

## How to Connect

As mentioned in the How To Install section, connecting to the Tessel is easy.
You just need to follow the provided instructions on the [Tessel site](http://start.tessel.io/install).

If you've already done this, your Tessel should already be connected and ready to run Cylon.JS code.

## Tessel Module Support

The Tessel has a variety of custom hardware modules specifically for use with Tessel. Cylon.js has support for the following Tessel modules:

- [Accelerometer](https://tessel.io/modules#module-accelerometer)
- [Ambient Light + Sound](https://tessel.io/modules#module-ambient)
- [Audio](https://tessel.io/modules#module-audio)
- [Bluetooth Low Energy](https://tessel.io/modules#module-ble)
- [Camera](https://tessel.io/modules#module-camera)
- [Climate](https://tessel.io/modules#module-climate)
- [GPS](https://tessel.io/modules#module-gps)
- [Infrared](https://tessel.io/modules#module-infrared)
- [Relay](https://tessel.io/modules#module-relay)
- [Servo](https://tessel.io/modules#module-servo)

## GPIO & I2C Support

In addition to the custom Tessel modules, you can also use the standard Cylon.js GPIO and I2C drivers:

  - [GPIO](https://en.wikipedia.org/wiki/General_Purpose_Input/Output) <=> [Drivers](https://github.com/hybridgroup/cylon-gpio)
    - Analog Sensor
    - Button
    - IR Rangefinder
    - LED
    - MakeyButton
    - Maxbotix Ultrasonic Range Finder

  - [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) <=> [Drivers](https://github.com/hybridgroup/cylon-i2c)
    - BlinkM
    - BMP180
    - HMC6352 Digital Compass
    - LCD
    - MPL115A2 Barometer/Thermometer
    - MPU6050

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.12.0 - Compatibility with Cylon 1.0.0

Version 0.11.0 - Adds climate-si7020 module support

Version 0.10.0 - Compatibility with Cylon 0.22.0

Version 0.9.0 - Resolve issues with Tessel hardware modules

Version 0.8.0 - Compatibility with Cylon 0.21.0

Version 0.7.0 - Compatibility with Cylon 0.20.0

Version 0.6.0 - Compatibility with Cylon 0.19.0

Version 0.5.0 - Compatibility with Cylon 0.18.0

Version 0.4.0 - Compatibility with Cylon 0.16.0

Version 0.3.0 - Add support for official Tessel Modules, Analog Read and PWM Write 

Version 0.2.1 - Add peerDependencies to package.json

Version 0.2.0 - Compatibility with Cylon 0.15.0

Version 0.1.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.0.1 - Initial release

## License

Copyright (c) 2013-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
