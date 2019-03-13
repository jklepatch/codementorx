const path = require('path');
const webpack = require('webpack');

let envPlugin;
if(process.env.NODE_ENV === 'production') {
  envPlugin = new webpack.DefinePlugin({'API_URL': 'https://codementorx-jklepatch.herokuapp.com'});
} else {
  envPlugin = new webpack.DefinePlugin({'API_URL': 'http://localhost:3000'});
}

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.\/client\/*.*\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {useBuiltIns: 'usage'}], 
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties', 
              ]
            },
          }
        ]
      },
      {
        test: /.\/client\/*.*\.png$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  },
  plugins: [envPlugin]
};
