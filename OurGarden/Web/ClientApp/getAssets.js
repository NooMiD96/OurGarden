var ignoreStyles = require('ignore-styles');

var unregPath = require("tsconfig-paths").register({
    baseUrl: './',
    "paths": {
        "@src/*": ["src/*"],
        "@core/*": ["src/core/*"],
        "@components/*": ["src/components/*"],
        "@antdSvgs/*": ["node_modules/@ant-design/icons/lib/outline/*"]
    },
});

require('ts-node').register({
    "baseUrl": "./",
    compilerOptions: {
        "module": "commonjs",
        "target": "es5",
        "esModuleInterop": true,
        "resolveJsonModule": true,
    },
    transpileOnly: true
})

var React = require("./node_modules/react");

var { baseUrl } = require("domain-task/fetch");
var renderToString = require("./node_modules/react-dom/server").renderToString;
var createMemoryHistory = require("./node_modules/history").createMemoryHistory;
var StaticRouter = require("./node_modules/react-router-dom").StaticRouter;
var Provider = require("./node_modules/react-redux").Provider;
var getBundles = require("./node_modules/react-loadable-ssr-addon").getBundles;
var Loadable = require("./node_modules/react-loadable");
var AppRoutes = require("./src/App.tsx").AppRoutes;
var configureStore = require("./src/boot-server/ConfigureStore.ts").default;

var utils = require("./src/boot-server/utils");

module.exports = function (callback, host, path, processDir) {
    baseUrl(host);

    const history = createMemoryHistory();
    history.replace(path);
    const store = configureStore(history);

    const modules = [];
    const routerContext = {};

    const app = React.createElement(
        Loadable.Capture,
        {
            report: (moduleName) => modules.push(moduleName)
        },
        React.createElement(
            Provider,
            {
                store: store
            },
            React.createElement(
                StaticRouter,
                {
                    basename: host,
                    context: routerContext,
                    location: path
                },
                AppRoutes
            )
        )
    );

    renderToString(app);

    utils.getFileStat(processDir)
        .then(stats => {
            const modulesToBeLoaded = [...stats.entrypoints, ...Array.from(modules)];
            const bundles = getBundles(stats, modulesToBeLoaded);

            const styles = bundles.css || [];
            const scripts = bundles.js || [];

            baseUrl();
            unregPath();
            ignoreStyles.restore();

            callback(null, { js: scripts, css: styles });
        })
        .catch(callback)
};