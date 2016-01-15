var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

module.exports = {
  entry: {
    'bundle': ['./src/AutoComplete.js'],
    'example': ['./example/index.js']
  },
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternal
  },
  output: {
    path: 'dist',
    filename: '[name].js',
    publicPath: '/assets/',
    library: 'ReactOtocomplete',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.jsx$/,  loader: 'babel-loader?stage=0', exclude: /node_modules/ },
      { test: /\.js$/,   loader: 'babel-loader?stage=0', exclude: /node_modules/ },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.css$/,  loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
