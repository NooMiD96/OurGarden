import getStartupValues from './startupValues';
import getSharedConfig from './shareConfig';
import getServerBundleConfig from './serverBundleConfig';
import getClientBundleConfig from './clientBundleConfig';

module.exports = (env: { [key: string]: string }) => {
  const {
    projectFolder,
    isDevBuild,
    isShowInBrowser,
    fileNameTemplate,
    buildModeString,
    optimizationConfiguration,
  } = getStartupValues(env, __dirname);

  const shareConfigFunc = () => getSharedConfig(
    optimizationConfiguration,
    buildModeString,
    isDevBuild ? 'eval-source-map' : '',
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
};