/* eslint-disable import/no-extraneous-dependencies */

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import merge from "webpack-merge";
import path from "path";
import { Configuration } from "webpack";

import AppSettings from "../../../appsettings.json";

const serverPlugins = () => [
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    filename: "[name].css",
  }),
];

// Configuration for server-side (prerendering) bundle suitable for running in Node
const getServerBundleConfig = (
  projectFolder: string,
  sharedConfig: () => Configuration
): Configuration => {
  const serverBundleConfig = merge(sharedConfig(), {
    entry: {
      [AppSettings.SpaServerFileName]: "./src/boot-server/boot-server.tsx",
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
      path: path.join(projectFolder, AppSettings.SpaPhysicalServerPath),
      libraryTarget: "commonjs",
    },
    // https://webpack.js.org/configuration/resolve/#resolve-mainfields
    // Import only main from package
    resolve: {
      mainFields: ["main"]
    },
    optimization: {
      splitChunks: {
        chunks: "async",
      }
    },
    target: "node",
    plugins: serverPlugins(),
  });

  return serverBundleConfig;
}

export default getServerBundleConfig;
