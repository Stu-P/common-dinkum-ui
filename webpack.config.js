const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
},

resolve: {
  extensions: [ '.js', '.jsx']
},
module: {
  loaders: [
    {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: [/node_modules/, /public/],
        query: {
            plugins: ["react-hot-loader/babel", 'transform-runtime'],
            presets: ['es2015', 'stage-0', 'react']
        }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader!less-loader'
    }
  ]
}
};