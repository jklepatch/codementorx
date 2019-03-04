const path = require('path');

module.exports = {
  mode: 'development',
  entry: '/client/index.js',
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
  }
}
