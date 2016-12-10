var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path:  './dist/assets',
    filename: 'bundle.js',
    publicPath:'assets'
  },
  devServer:{
    contentBase:'./dist'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader?presets[]=es2015&presets[]=react"]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      }
    ]
  }
};
