"use strict";

var balls = {
  create: function(world, options) {
    options = options || {};
    var x = options.x || 0; // x-coordinate
    var y = options.y || 0; // y-coordinate
    var vx = options.vx || 0.2; // velocity in x-direction
    var vy = options.vy || 0.01; // velocity in y-direction
    var radius = options.radius || 20;

    world.add(
      Physics.body('circle', {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        radius: radius
      })
    );
  }
};

module.exports = balls;