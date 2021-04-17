const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");
const path = require('path')


module.exports = env => {
    return {

        //entry: __dirname + "/src/index.js",
        //entry: path.resolve(__dirname, 'src', 'index.js'),
        entry: ["babel-polyfill", path.resolve(__dirname, 'src', 'index.js')],
        //entry: ['babel-polyfill', './test.js'],
        mode: 'development',
        output: {
            path: path.resolve(__dirname, 'build')
        },
        /*performance: {
          hints: process.env.NODE_ENV === 'production' ? "warning" : false
        },*/
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": "defaults"
                                }],
                                '@babel/preset-react'
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    //use: ['style-loader', 'css-loader']
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //hmr: env.NODE_ENV === 'development',
                            //hmr: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0
                        }
                    }
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'

                }

            ],
        },


        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].main.css',
                chunkFilename: '[id].css'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebPackPlugin(),

        ]
    }
};