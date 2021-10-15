/* eslint-disable import/no-extraneous-dependencies */

import webpack, { Plugin } from "webpack";

import AppSettings from "../../../appsettings.json";

const getGeneralPlugins = (): Plugin[] => [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

  // hide warning in the webpack
  new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, "node-noop"),

  // https://webpack.js.org/guides/caching/#module-identifiers
  new webpack.HashedModuleIdsPlugin(),

  // https://webpack.js.org/plugins/environment-plugin
  new webpack.EnvironmentPlugin({
    PUBLIC_URL: AppSettings.SpaPublicPath,
    isWebpackBundle: true,
  }),
];

export default getGeneralPlugins;
