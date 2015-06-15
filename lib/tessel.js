/*
 * Cylonjs Tessel adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

/* eslint camelcase: 0 */

var tessel = require("tessel"),
    Cylon = require("cylon");

var commands = [
  "digitalWrite", "digitalRead", "analogRead",
  "pwmWrite", "i2cRead", "i2cWrite"
];

var Tessel = module.exports = function Tessel() {
  Tessel.__super__.constructor.apply(this, arguments);

  this.i2cReady = false;
  this.i2cDevices = {};

  this.proxyMethods(commands, this.board, this);
};

Cylon.Utils.subclass(Tessel, Cylon.Adaptor);

/**
 * Connects to the Tessel
 *
 * @param {Function} callback to be triggered when connected
 * @return {void}
 */
Tessel.prototype.connect = function(callback) {
  callback();
};

/**
 * Disconnects from the Tessel
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {void}
 */
Tessel.prototype.disconnect = function(callback) {
  callback();
};

Tessel.prototype._hasPort = function() {
  if (this.port) {
    return true;
  }
  return false;
};

Tessel.prototype._tesselPort = function() {
  return tessel.port(this.port);
};

Tessel.prototype._tesselPin = function(pin) {
  if (this._hasPort()) {
    return this._tesselPort().pin[pin];
  }
  return tessel.led[pin];
};

/**
 * Writes a value to a digital pin
 *
 * @param {Number} pin pin to write to
 * @param {Number} value value to write
 * @return {void}
 * @publish
 */
Tessel.prototype.digitalWrite = function(pin, value) {
  if (value === 1) {
    this._tesselPin(pin).write(1);
  } else {
    this._tesselPin(pin).write(0);
  }
};

/**
 * Writes a PWM value to a pin
 *
 * @param {Number} pin pin to write to
 * @param {Number} value value to write
 * @return {void}
 * @publish
 */
Tessel.prototype.pwmWrite = function(pin, value) {
  this._tesselPort().pwmFrequency(100);
  this._tesselPin(pin).pwmDutyCycle(value);
};

/**
 * Reads a value from an analog pin
 *
 * @param {Number} pin pin to read from
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {void}
 * @publish
 */
Tessel.prototype.analogRead = function(pin, callback) {
  var data, prev_data;

  data = null;
  prev_data = null;

  Cylon.Utils.every(0, function() {
    data = this._tesselPin(pin).read() * this._tesselPin(pin).resolution;

    if (data !== prev_data) {
      prev_data = data;
      callback(null, data);
    }
  }.bind(this));
};

/**
 * Reads a value from a digital pin
 *
 * @param {Number} pin pin to read from
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {void}
 * @publish
 */
Tessel.prototype.digitalRead = function(pin, callback) {
  var data, prev_data;

  data = null;
  prev_data = null;

  if (pin !== "config") {
    Cylon.Utils.every(0, function() {
      data = this._tesselPin(pin).read();

      if (data !== prev_data) {
        prev_data = data;
        callback(data);
      }
    }.bind(this));
  } else {
    tessel.button.on("press", function() {
      callback(null, 1);
    });
    tessel.button.on("release", function() {
      callback(null, 0);
    });
  }
};

/**
 * Writes an I2C value to the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Array} buff buffered data to write
 * @param {Function} callback function to be called when done
 * @return {void}
 * @publish
 */
Tessel.prototype.i2cWrite = function(address, cmd, buff, callback) {
  buff = buff != null ? buff : [];
  cmd = cmd instanceof Array ? cmd : [cmd];
  this.i2cDevice(address).send(new Buffer(cmd.concat(buff)), callback);
};

/**
 * Reads an I2C value from the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Number} length amount of data to read
 * @param {Function} callback function to be called when done
 * @return {void}
 * @publish
 */
Tessel.prototype.i2cRead = function(address, cmd, length, callback) {
  cmd = cmd instanceof Array ? cmd : [cmd];

  this.i2cDevice(address).send(new Buffer(cmd), function(err) {
    if (err) {
      callback(err);
    } else {
      this.i2cDevice(address).receive(length, callback);
    }
  }.bind(this));
};

Tessel.prototype.i2cDevice = function(address) {
  if (this.i2cDevices[address] === null) {
    var port = this._tesselPort();
    this.i2cDevices[address] = new port.I2C(address);
  }
  return this.i2cDevices[address];
};
