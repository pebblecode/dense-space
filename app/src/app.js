"use strict";

var _ = require('lodash');
var $ = require('jquery');
var canvas = require('./lib/canvas');

var balls = require("./lib/balls");
var data = require("../public/data/population-density");

// Expose for hacking
window.data = data;
window._ = _;

function redraw(worldPromise, screenWidth, screenHeight, ballDensity, ballOptions) {
  var allBalls = [];

  worldPromise.then(function(world) {
    // Generate all the balls
    allBalls = balls.createByDensity(world, ballDensity, ballOptions);

    // Redraw view
    $("#viewport").click(function() {
      _.each(allBalls, function(b) {
        world.removeBody(b);
      });
      $("#viewport").unbind('click');

      redraw(worldPromise, screenWidth, screenHeight);
    });
  });

}

$(document).ready(function() {
  var screenWidth = $("body").innerWidth();
  var screenHeight = $(document).innerHeight();
  var el = {
    name: $("#name"),
    autocomplete: $(".autocomplete")
  }

  var worldPromise = canvas.init(screenWidth, screenHeight);

  var gbData = _.find(data, {
    code: "MO"
  });
  var density = gbData.value;

  var ballOptions =  {
    width: screenWidth,
    height: screenHeight
  };
  redraw(worldPromise, screenWidth, screenHeight, density, ballOptions);

  el.name.click(function(event) {
    el.autocomplete.show();
    event.stopPropagation();
  });

  el.name.keypress(function(event) {
    var val = $("#name").val();
    if ( event.which === 13 && val) {
      event.preventDefault();
    } else {
      var results = _.filter(data, function(d) {
        var lowerName = d.name.toLowerCase();
        var lowerVal = val.toLowerCase();
        return _.contains(lowerName, lowerVal);
      });

      var strVals = _.map(results, function(r) {
        return "<div><a href='#" + r.code + "'>" + r.name + "</a><div>";
      });
      var str = strVals.join("");

      el.autocomplete.html(str);
    }
  });
});