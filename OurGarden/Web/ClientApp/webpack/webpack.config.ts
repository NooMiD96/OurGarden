import getStartupValues from "./startupValues";
import getSharedConfig from "./shareConfig";
import getServerBundleConfig from "./serverBundleConfig";
import getClientBundleConfig from "./clientBundleConfig";

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); 
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap((env: { [key: string]: string }) => {
  const {
    projectFolder,
    isDevBuild,
    isShowInBrowser,
    fileNameTemplate,
    buildModeString,
    optimizationConfiguration,
  } = getStartupValues(env, __dirname);

  const shareConfigFunc = () => getSharedConfig(
    env,
    optimizationConfiguration,
    buildModeString,
    isDevBuild ? "eval-source-map" : "",
    fileNameTemplate
  );

  const serverBundleConfig = getServerBundleConfig(
    projectFolder,
    shareConfigFunc
  );

  const clientBundleConfig = getClientBundleConfig(
    projectFolder,
    fileNameTemplate,
    isShowInBrowser,
    isDevBuild,
    shareConfigFunc
  )

  return [clientBundleConfig, serverBundleConfig];
});
