import getStartupValues from "./startupValues";
import getSharedConfig from "./shareConfig";
import getServerBundleConfig from "./serverBundleConfig";
import getClientBundleConfig from "./clientBundleConfig";

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

module.exports = (env: { [key: string]: string }) => {
  const {
    projectFolder,
    isDevBuild,
    isShowInBrowser,
    fileNameTemplate,
    buildModeString,
    optimizationConfiguration,
  } = getStartupValues(env, __dirname);

  const shareConfig = getSharedConfig(
    env,
    optimizationConfiguration,
    buildModeString,
    isDevBuild ? "eval-source-map" : "",
    fileNameTemplate
  );

  const webpackConfigList = [];

  const serverBundleConfig = getServerBundleConfig(projectFolder, shareConfig);
  webpackConfigList.push(serverBundleConfig);

  const clientBundleConfig = getClientBundleConfig(
    projectFolder,
    fileNameTemplate,
    isShowInBrowser,
    isDevBuild,
    shareConfig
  );
  webpackConfigList.push(clientBundleConfig);

  return webpackConfigList;
};
