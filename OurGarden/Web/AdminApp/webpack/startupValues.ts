/* eslint-disable import/no-extraneous-dependencies */

import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { Options } from "webpack";

const getStartupValues = (
  env: { [key: string]: string },
  dirname: string
) => {
  const projectFolder = path.join(dirname, "../../../");
  let isDevBuild = true;
  let isShowInBrowser = false;

  if (env) {
    isDevBuild = !env.prod;
    isShowInBrowser = !!env.show;
  }

  const fileNameTemplate = "[name]";

  let buildModeString = "development";
  let optimizationConfiguration: Options.Optimization = {
    minimize: !isDevBuild,
    // splitChunks: {
    //   automaticNameDelimiter: ".",
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   name: true,
    // },
  }
  if (!isDevBuild) {
    buildModeString = "production";
    optimizationConfiguration.minimizer = [
      new TerserPlugin({ parallel: true }),
      new OptimizeCSSAssetsPlugin({})
    ];
  }
  optimizationConfiguration.nodeEnv = buildModeString;

  return {
    projectFolder,
    isDevBuild,
    isShowInBrowser,
    fileNameTemplate,
    buildModeString,
    optimizationConfiguration,
  };
};

export default getStartupValues;
