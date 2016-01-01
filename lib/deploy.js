'use strict';

var ghpages = require('gh-pages'),
    webpackConfig = require('../webpack.config');

main();

function main() {
  ghpages.publish(webpackConfig.output.path, function(err) {
    if (err) {
      return console.error('Error when trying to publish to github:', err);
    }

    console.log('Published to github pages!');
  });
}
