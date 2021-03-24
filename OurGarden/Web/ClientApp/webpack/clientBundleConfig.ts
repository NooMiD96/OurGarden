/* eslint-disable import/no-extraneous-dependencies */

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import merge from "webpack-merge";
import path from "path";
import { Configuration, Plugin } from "webpack";
import { ReactLoadablePlugin } from "react-loadable/webpack";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

import AppSettings from "../../../appsettings.json";

/* eslint-disable @typescript-eslint/no-var-requires */
const ImageminPlugin = require("imagemin-webp-webpack-plugin");

const ReactLoadableSSRAddon = require("react-loadable-ssr-addon");
/* eslint-enable @typescript-eslint/no-var-requires */

const pathToPublic = `${path.join(
  __dirname,
  "../../../",
  "./wwwroot/client/client"
)}`;

const clientPlugins = (
  isShowInBrowser: boolean,
  fileNameTemplate: string
): Plugin[] => [
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    filename: `${fileNameTemplate}.css`,
  }),

  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    openAnalyzer: isShowInBrowser,
    analyzerHost: "0.0.0.0",
    analyzerPort: 5500,
  }),

  new ReactLoadablePlugin({
    filename: `${pathToPublic}/react-loadable.json`,
  }),
  new ReactLoadableSSRAddon({
    filename: `${pathToPublic}/assets-manifest.json`,
  }),
  new ImageminPlugin({
    config: [
      {
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75,
        },
      },
    ],
    overrideExtension: true,
    detailedLogs: false,
    silent: false,
    strict: true,
    // bail: false, // Ignore errors on corrupted images
    // cache: true,
    // imageminOptions: {
    //   plugins: [
    //     ["gifsicle", { interlaced: true }],
    //     ["jpegoptim", { progressive: true, max: 90 }],
    //     ["optipng", { optimizationLevel: 5 }],
    //   ],
    // },
  }),
];

// Configuration for client-side bundle suitable for running in browsers
const getClientBundleConfig = (
  projectFolder: string,
  fileNameTemplate: string,
  isShowInBrowser: boolean,
  isDevBuild: boolean,
  sharedConfig: Configuration
): Configuration => {
  const clientBundleConfig = merge(sharedConfig, {
    entry: {
      [AppSettings.SpaClientFileName]: "./src/boot-client/boot-client.tsx",
    },
    output: {
      filename: `${fileNameTemplate}.js`,
      chunkFilename: `${fileNameTemplate}.js`,
      publicPath: `${AppSettings.SpaPublicPath}/`,
      path: path.join(projectFolder, AppSettings.SpaPhysicalClientPath),
    },
    optimization: {
      runtimeChunk: "single",
      moduleIds: "hashed",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          antd: {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*(antd|ant-design)[^\\/]*[\\/]/,
            priority: -1,
          },
          "material-ui": {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*@material-ui[^\\/]*[\\/]/,
            priority: -1,
          },
          rc: {
            chunks: "all",
            // rc-[componentName] - used in the antd etc. components
            test: /[\\/]node_modules[\\/][^\\/]*rc-[^\\/]*[\\/]/,
            priority: -1,
          },
          "hot-loader": {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*@hot-loader[^\\/]*[\\/]/,
            priority: -2,
          },
          "lottie-web": {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*lottie-web[^\\/]*[\\/]/,
            priority: -2,
          },
          "react.redux": {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*(react|redux)[^\\/]*[\\/]/,
            priority: -2,
          },
          "react-lazy-load": {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*react-lazy-load-image-component[^\\/]*[\\/]/,
            priority: -3,
          },
          "react-phone-input": {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*react-phone-input-2[^\\/]*[\\/]/,
            priority: -3,
          },
          assets: {
            chunks: "all",
            test: /[\\/]src[\\/][^\\/]*assets[^\\/]*[\\/]/,
            priority: -3,
          },
          "async-validator": {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*async-validator[^\\/]*[\\/]/,
            priority: -4,
          },
          lodash: {
            chunks: "all",
            test: /[\\/]node_modules[\\/][^\\/]*lodash[^\\/]*[\\/]/,
            priority: -5,
          },
        },
      },
    },
    plugins: clientPlugins(isShowInBrowser, fileNameTemplate),
  });

  if (isDevBuild) {
    clientBundleConfig!.plugins!.push(
      // https://github.com/webpack-contrib/copy-webpack-plugin
      // new CopyWebpackPlugin([{
      //   from: "src/sw.ts",
      //   to: "service-worker.js",
      // }])
      new CaseSensitivePathsPlugin()
    );
  } else {
    // clientBundleConfig.entry["service-worker"] = "./src/sw.ts";
  }

  return clientBundleConfig;
};

export default getClientBundleConfig;
