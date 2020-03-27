const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
      },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
        
      }

      
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.js",
      filename: "./index.html"
    })
  ]
};