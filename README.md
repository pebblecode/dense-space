# Dense space

A visualisation of population density for pebble {code}'s Data visualisation hackday (2014-01-30)

## Development

Install pre-requisites

    npm install

## Testing

Uses [karma](http://karma-runner.github.io/) and [jasmine](https://jasmine.github.io/).

Karma is run automatically when `grunt` is called. To run it manually

    karma start config/karma.conf.js

For continuous integration, run

    grunt ci:test

    # Or,

    npm test
