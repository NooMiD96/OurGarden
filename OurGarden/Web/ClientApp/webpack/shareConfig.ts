/* eslint-disable import/no-extraneous-dependencies */

import { Configuration, Options } from "webpack";

import getAlias from "./alias";
import getAssetsModuleRules from "./assetsModuleRules";
import getJsModuleRules from "./jsModuleRules";
import getGeneralPlugins from "./generalPlugins";

// Configuration in common to both client-side and server-side bundles
const getSharedConfig = (
  env: { [key: string]: string },
  optimizationConfiguration: Options.Optimization,
  buildModeString: "development" | "production",
  devtool: "eval-source-map" | "",
  fileNameTemplate: string
): Configuration => {
  const sharedConfig: Configuration = {
    // https://webpack.js.org/configuration/stats/
    // Add built modules information
    stats: {
      modules: false,
      children: false
    },
    // https://webpack.js.org/configuration/resolve/#resolve-extensions
    // Can import files without extansions
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: getAlias()
    },
    // https://webpack.js.org/configuration/module/
    module: {
      rules: [
        ...getAssetsModuleRules(env, fileNameTemplate),
        ...getJsModuleRules()
      ]
    },
    plugins: getGeneralPlugins(),
    optimization: optimizationConfiguration,
    mode: buildModeString
  };

  if (devtool) {
    sharedConfig.devtool = devtool;
    sharedConfig.resolve!.alias!["react-dom"] = "@hot-loader/react-dom";
  }

  return sharedConfig;
};

export default getSharedConfig;
