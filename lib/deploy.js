'use strict';

var ghpages = require('gh-pages'),
    webpackConfig = require('../webpack.config');

main();

function main() {
  ghpages.publish(webpackConfig.output.path, console.error.bind(console));
}
