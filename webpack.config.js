const webpack = require('webpack');
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const htmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/view.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: './bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[id].css"}),
    new UglifyJSPlugin(),
    new htmlWebPackPlugin({template: "./public/index.html",filename: "./index.html"}),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    inline: true,
    open: false,
    hot: true,
    port: (parseInt(process.env.PORT)|| 80),
    proxy: {
      "/api": "http://" + (process.env.HOST_API || "localhost") + ":" + (process.env.PORT_API || "3000"),
      "/ctrl": "http://" + (process.env.HOST_API || "localhost") + ":" + (process.env.PORT_API || "3000")
    }
  },
  devtool: "eval-source-map"
};
