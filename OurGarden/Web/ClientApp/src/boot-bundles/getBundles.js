/* eslint-disable */
module.exports = function (callback, host, path, processDir, isPageNotFound) {
    !process.env.isGetAssetsProdBuild && require("./registerTypeScript")(processDir);

    var renderToString = require("react-dom/server").renderToString;
    var createMemoryHistory = require("history").createMemoryHistory;
    var getBundles = require("react-loadable-ssr-addon").getBundles;
    var Loadable = require("react-loadable");

    var App = require("./app");
    var configureStore = require("../boot-server/ConfigureStore.ts").default;
    var utils = require("../boot-server/utils");
    var mainActions = require("@src/components/Main/State/actions").actionCreators;

    var ServerStyleSheets = require("@material-ui/core/styles").ServerStyleSheets;

    const history = createMemoryHistory();
    history.replace(path);
    const store = configureStore(history);

    const modules = [];
    const routerContext = {};
    const helmetContext = {};

    store.dispatch(mainActions.pageNotFoundError(isPageNotFound));

    Loadable.preloadAll().then(() => {
        const app = App(
            modules,
            store,
            host,
            routerContext,
            path,
            helmetContext
        );

        const sheets = new ServerStyleSheets();

        renderToString(sheets.collect(app));

        utils.getFileStat(processDir)
            .then(stats => {
                const modulesToBeLoaded = [...stats.entrypoints, ...Array.from(modules)];
                const bundles = getBundles(stats, modulesToBeLoaded);

                const styles = bundles.css || [];
                const scripts = bundles.js || [];

                const helmet = helmetContext.helmet;

                callback(
                    null,
                    {
                        js: scripts,
                        css: styles,
                        stringCss: sheets.toString(),
                        helmetTitle: helmet && helmet.title.toString(),
                        helmetMeta: helmet && helmet.meta.toString()
                    });
            })
            .catch(callback)
    });
};