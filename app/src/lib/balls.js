"use strict";

var balls = {
  init: function(world, viewWidth, viewHeight) {
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
    // render on each step
    world.on('step', function(){
      world.render();
    });

    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // constrain objects to these bounds
    world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.99,
      cof: 0.99
    }));

    // add a circle
    world.add(
      Physics.body('circle', {
        x: 50, // x-coordinate
        y: 30, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 20
      })
    );
  }
};

module.exports = balls;