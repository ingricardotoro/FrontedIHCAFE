const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

const HtmlWebPackPluginConfig = new HtmlWebPackPlugin({
  template: "./src/index.js",
  filename: "index.js",
  inject: "body"
});

module.exports = {

  //entry: __dirname + "/src/index.js",
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: 'development',

  /*performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },*/
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader'

      }
      /*{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },*/

    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  /* output: {
     filename: 'transformed.js',
     path: __dirname + "/build",
   },*/
  /*rules: [
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


  ]*/

  /*plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.js",
      filename: "./index.html"
    })
  ]*/

  plugins: [HtmlWebPackPluginConfig]
};