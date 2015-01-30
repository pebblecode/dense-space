"use strict";

var balls = {
  create: function(world, options) {
    options = options || {};
    var x = options.x || 0; // x-coordinate
    var y = options.y || 0; // y-coordinate
    var vx = options.vx || 0.2; // velocity in x-direction
    var vy = options.vy || 0.01; // velocity in y-direction
    var radius = options.radius || 20;

    var circle = Physics.body('circle', {
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      radius: radius
    });

    world.add(circle);

    return circle;
  },
  createByDensity: function(world, density, options) {
    options = options || {};
    density = density || 0;
    var width = options.width || 100;
    var height = options.height || 100;
    var meterSqPerPerson = options.meterSqPerPerson || 1;
    var numCircles = options.numCircles || 100;

    var kmSqPerPerson = meterSqPerPerson * Math.pow(1000, 2);
    var screenArea = width * height;

    var totalCircleArea = density / kmSqPerPerson * screenArea;


    var circleArea = totalCircleArea / numCircles;
    var circleRadius = Math.sqrt(circleArea / Math.PI);
    var allBalls = [];

    for (var i = 0; i < numCircles; i++) {
      var ball = balls.create(world, {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.7,
        vy: Math.random() * 0.7,
        radius: circleRadius
      });
      allBalls.push(ball);
    }

    return allBalls;
  }
};

module.exports = balls;