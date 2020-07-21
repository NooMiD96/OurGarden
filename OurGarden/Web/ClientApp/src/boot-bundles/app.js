/* eslint-disable */
var React = require("react");
var Loadable = require("react-loadable");
var Provider = require("react-redux").Provider;
var StaticRouter = require("react-router-dom").StaticRouter;
var HelmetProvider = require("react-helmet-async").HelmetProvider;
var AppRoutes = require("../App.tsx").AppRoutes;

var { baseUrl } = require("domain-task/fetch");

module.exports = function (
    modules,
    store,
    host,
    routerContext,
    path,
    helmetContext
) {
    baseUrl(host);

    return React.createElement(
        Loadable.Capture,
        {
            report: (moduleName) => modules.push(moduleName)
        },
        React.createElement(
            HelmetProvider,
            {
                context: helmetContext
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
        )
    );
}