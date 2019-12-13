/* eslint-disable import/no-extraneous-dependencies */

import path from "path";
import webpack, { Configuration, optimize } from "webpack";
import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import getAlias from "./alias";

import AppSettings from "../../../appsettings.json";

// prettier-ignore
const getBundelConfig = (
  projectFolder: string,
  sharedConfig: Configuration
): Configuration => merge(sharedConfig, {
  entry: {
    getBundles: "./src/boot-bundles/getBundles.js"
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.join(projectFolder, "wwwroot/bundles"),
    libraryTarget: "commonjs2"
  },
  // https://webpack.js.org/configuration/resolve/#resolve-mainfields
  // Import only main from package
  resolve: {
    mainFields: ["main"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: getAlias()
  },
  stats: {
    modules: false
    // children: false
  },
  target: "node",
  plugins: [
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: "[name].css",
      ignoreOrder: true
    }),
    new optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.EnvironmentPlugin({
      PUBLIC_URL: AppSettings.SpaPublicPath,
      isProdBuild: true
    })
  ],
  mode: "production"
});

export default getBundelConfig;
