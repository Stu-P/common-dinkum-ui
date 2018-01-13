const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  }
}