"use strict";

var _ = require('lodash');
var $ = require ('jquery');

var balls = require("./lib/balls");
var data = require("../public/data/population-density");

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

    var renderer = Physics.renderer('canvas', {
      id: 'viewport',
      width: viewWidth,
      height: viewHeight,
      meta: false, // don't display meta data
      styles: {
        // set colors for the circle bodies
        'circle' : {
          strokeStyle: '#351024',
          lineWidth: 1,
          fillStyle: '#B1D884',
          angleIndicator: '#351024'
        }
      }
    });

    // add the renderer
    world.add( renderer );

    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // constrain objects to these bounds
    world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.99
    }));

    // Generate all the balls
    var gbData = _.find(data, {
      code: "MO"
    });
    var density = gbData.value;
    balls.createByDensity(world, density, {
      width: viewWidth,
      height: viewWidth
    });

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

// Expose for hacking
window.data = data;
window._ = _;