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

    const history = createMemoryHistory();
    history.replace(path);
    const store = configureStore(history);

    const modules = [];
    const routerContext = {};

    store.dispatch(mainActions.pageNotFoundError(isPageNotFound));

    Loadable.preloadAll().then(() => {
        const app = App(
            modules,
            store,
            host,
            routerContext,
            path
        );

        renderToString(app);

        utils.getFileStat(processDir)
            .then(stats => {
                const modulesToBeLoaded = [...stats.entrypoints, ...Array.from(modules)];
                const bundles = getBundles(stats, modulesToBeLoaded);

                const styles = bundles.css || [];
                const scripts = bundles.js || [];

                callback(null, { js: scripts, css: styles });
            })
            .catch(callback)
    });
};