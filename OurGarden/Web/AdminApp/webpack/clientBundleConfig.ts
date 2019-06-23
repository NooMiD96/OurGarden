/* eslint-disable import/no-extraneous-dependencies */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ManifestPlugin from 'webpack-manifest-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';
import path from 'path';
import { Configuration, Plugin } from 'webpack';

import AppSettings from "../../../appsettings.json";

const clientPlugins = (
  isShowInBrowser: boolean,
  fileNameTemplate: string
): Plugin[] => ([
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    filename: `${fileNameTemplate}.css`,
  }),

  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: isShowInBrowser,
    analyzerHost: "0.0.0.0",
    analyzerPort: 5500,
  }),

  // https://github.com/danethurber/webpack-manifest-plugin
  new ManifestPlugin({
    fileName: "manifest-assets.json",
    filter: fileDescriptor => fileDescriptor.name !== "service-worker.js"
  }),
]);

// Configuration for client-side bundle suitable for running in browsers
const getClientBundleConfig = (
  projectFolder: string,
  fileNameTemplate: string,
  isShowInBrowser: boolean,
  isDevBuild: boolean,
  sharedConfig: () => Configuration
): Configuration => {
  const clientBundleConfig = merge(sharedConfig(), {
    entry: {
      [AppSettings.SpaClientFileName]: './src/boot-client/boot-client.tsx'
    },
    output: {
      filename: `${fileNameTemplate}.js`,
      chunkFilename: `${fileNameTemplate}.js`,
      publicPath: `${AppSettings.SpaAdminPublicPath}/`,
      path: path.join(projectFolder, AppSettings.SpaAdminPhysicalClientPath)
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: "all",
    //     cacheGroups: {
    //       "react.redux": {
    //         chunks: 'all',
    //         // The all *react* and *redux* modules without "react-beautiful-dnd"
    //         // 'cause it is used only in TodoList component
    //         test: /[\\/]node_modules[\\/][^\\/]*(react(?!-beautiful-dnd)|redux)[^\\/]*[\\/]/,
    //         priority: 2
    //       },
    //       "react.dnd": {
    //         chunks: 'all',
    //         test: /[\\/]node_modules[\\/][^\\/]*react-beautiful-dnd[^\\/]*[\\/]/,
    //         priority: 2
    //       },
    //       antd: {
    //         chunks: 'all',
    //         test: /[\\/]node_modules[\\/][^\\/]*(antd|ant-design)[^\\/]*[\\/]/,
    //         priority: 1,
    //       },
    //       rc: {
    //         chunks: 'all',
    //         // rc-[componentName] - used in the antd etc. components
    //         test: /[\\/]node_modules[\\/][^\\/]*rc-[^\\/]*[\\/]/,
    //         priority: 1,
    //       }
    //     }
    //   }
    // },
    plugins: clientPlugins(
      isShowInBrowser,
      fileNameTemplate
    ),
  });

  if (isDevBuild) {
    // clientBundleConfig!.plugins!.push(
    //   // https://github.com/webpack-contrib/copy-webpack-plugin
    //   new CopyWebpackPlugin([{
    //     from: "src/sw.ts",
    //     to: 'service-worker.js',
    //   }])
    // );
  } else {
    // clientBundleConfig.entry['service-worker'] = './src/sw.ts';
  }

  return clientBundleConfig;
};

export default getClientBundleConfig;
