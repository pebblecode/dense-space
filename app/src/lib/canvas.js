"use strict";

var $ = require ('jquery');
var Q = require('q');

var init = function(screenWidth, screenHeight) {
  var deferred = Q.defer();
  var el = {
    viewport: $("#viewport")
  };

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
      restitution: 0.9, // Higher = more bouncy
      cof: 0.99
    }));

    // render on each step
    world.on('step', function(){
      world.render();
    });

    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    // add some gravity
    world.add( Physics.behavior('constant-acceleration') );

    // colliding with each other
    world.add( Physics.behavior('body-collision-detection') );
    world.add( Physics.behavior('sweep-prune') ); // optimization for collision

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time, dt ) {
      world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();

    deferred.resolve(world);
  });

  return deferred.promise;
};

module.exports = {
  init: init
};