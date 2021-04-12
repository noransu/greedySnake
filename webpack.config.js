const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: "./src/index.ts",
  output: {
    // 打包生成的文件输出路径
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    // 禁止输出的文件中用箭头函数
    environment: {
      arrowFunction: false,
      const: false,
    }
  },
  // 指定webpack打包时需要的模块
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: ["style-loader", "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                ["postcss-preset-env", {
                  browsers: "last 2 version"
                }]
              ],

            },
          }
        },
        "less-loader"]
    }, {
      test: /\.ts$/,
      use: [
        {
          loader: "babel-loader",
          // options: {
          //   presets: [
          //     [
          //       "@babel/preset-env",
          //       {
          //         // 按需加载
          //         useBuiltIns: "usage",
          //         corejs: "3",
          //         targets: {
          //           chrome: "88",
          //           ie: "11"
          //         },
          //       }
          //     ]
          //   ]
          // }
        },
        "ts-loader"
      ],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // WDS服务的基础目录
    contentBase: "./dist",
    hot: true,
  },
  // 设置引用的模块 import ...ts文件之类
  resolve: {
    extensions: ['.ts', '.js']
  }
}
