"use strict";

var balls = require("./lib/balls");

var init = function() {
  var el = {
    viewport: $("#viewport")
  };

  var screenWidth = $("body").innerWidth();
  var screenHeight = $(document).innerHeight();

  el.viewport.width(screenWidth);
  el.viewport.height(screenHeight);

  Physics(function(world) {

    var viewWidth = screenWidth;
    var viewHeight = screenHeight;

    balls.init(world, viewWidth, viewHeight);

    // render on each step
    world.on('step', function(){
      world.render();
    });

    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    // add some gravity
    world.add( Physics.behavior('constant-acceleration') );

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time, dt ) {
      world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();

  });
};

$(document).ready(function() {
  init();
});