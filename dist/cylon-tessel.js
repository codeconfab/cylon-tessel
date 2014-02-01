/*
 * cylon-tessel
 * http://cylonjs.com
 *
 * Copyright (c) 2013 Your Name Here
 * Your License Here
*/


(function() {
  'use strict';
  var GPIO, namespace,
    __slice = [].slice;

  namespace = require('node-namespace');

  require('cylon');

  require('./tessel');

  GPIO = require("cylon-gpio");

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Cylon.Adaptors.Tessel, args, function(){});
    },
    driver: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return GPIO.driver.apply(GPIO, args);
    },
    register: function(robot) {
      robot.registerAdaptor('cylon-tessel', 'tessel');
      return GPIO.register(robot);
    }
  };

}).call(this);
