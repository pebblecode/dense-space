"use strict";

var _ = require('lodash');
var $ = require('jquery');
var canvas = require('./lib/canvas');

var balls = require("./lib/balls");
var data = require("../public/data/population-density");

// Expose for hacking
window.data = data;
window._ = _;

$(document).ready(function() {
  var screenWidth = $("body").innerWidth();
  var screenHeight = $(document).innerHeight();

  var worldPromise = canvas.init(screenWidth, screenHeight);

  worldPromise.then(function(world) {
    // Generate all the balls
    var gbData = _.find(data, {
      code: "MO"
    });
    var density = gbData.value;
    var allBalls = balls.createByDensity(world, density, {
      width: screenWidth,
      height: screenHeight
    });

    // Refresh view
    $("#viewport").click(function() {
      _.each(allBalls, function(b) {
        world.removeBody(b);
      });
      $("#viewport").unbind('click');
    });
  });
});