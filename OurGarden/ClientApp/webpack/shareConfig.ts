import getAlias from './alias';
import getAssetsModuleRules from './assetsModuleRules';
import getJsModuleRules from './jsModuleRules';
import getGeneralPlugins from './generalPlugins';

import { Configuration } from 'webpack';

// Configuration in common to both client-side and server-side bundles
const getSharedConfig = (
  optimizationConfiguration: any,
  buildModeString: any,
  devtool: any,
  fileNameTemplate: any
): Configuration => {
  const sharedConfig: Configuration = {
    // https://webpack.js.org/configuration/stats/
    // Add built modules information
    stats: {
      modules: false,
      // children: false
    },
    // https://webpack.js.org/configuration/resolve/#resolve-extensions
    // Can import files without extansions
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: getAlias(),
    },
    // https://webpack.js.org/configuration/module/
    module: {
      rules: [
        ...getAssetsModuleRules(fileNameTemplate),
        ...getJsModuleRules(),
      ]
    },
    plugins: getGeneralPlugins(),
    optimization: optimizationConfiguration,
    mode: buildModeString,
  };

  if (devtool) {
    sharedConfig.devtool = devtool;
  }

  return sharedConfig;
};

export default getSharedConfig;
