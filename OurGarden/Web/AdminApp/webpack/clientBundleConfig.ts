/* eslint-disable import/no-extraneous-dependencies */

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ManifestPlugin from "webpack-manifest-plugin";
import merge from "webpack-merge";
import path from "path";
import { Configuration, Plugin } from "webpack";

import AppSettings from "../../../appsettings.json";

const clientPlugins = (
  isShowInBrowser: boolean,
  fileNameTemplate: string
): Plugin[] => [
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    filename: `${fileNameTemplate}.css`,
  }) as any,

  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    openAnalyzer: isShowInBrowser,
    analyzerHost: "0.0.0.0",
    analyzerPort: 5500,
  }),

  // https://github.com/danethurber/webpack-manifest-plugin
  new ManifestPlugin({
    fileName: "manifest-assets.json",
    filter: (fileDescriptor) => fileDescriptor.name !== "service-worker.js",
  }) as any,
];

// Configuration for client-side bundle suitable for running in browsers
const getClientBundleConfig = (
  projectFolder: string,
  fileNameTemplate: string,
  isShowInBrowser: boolean,
  _: boolean,
  sharedConfig: () => Configuration
): Configuration => {
  const clientBundleConfig = merge(sharedConfig(), {
    entry: {
      [AppSettings.SpaClientFileName]: "./src/boot-client/boot-client.tsx",
    },
    output: {
      filename: `${fileNameTemplate}.js`,
      chunkFilename: `${fileNameTemplate}.js`,
      publicPath: `${AppSettings.SpaAdminPublicPath}/`,
      path: path.join(projectFolder, AppSettings.SpaAdminPhysicalClientPath),
    },
    plugins: clientPlugins(isShowInBrowser, fileNameTemplate),
  });

  return clientBundleConfig;
};

export default getClientBundleConfig;
