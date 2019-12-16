/* eslint-disable */
var path = require("path");

module.exports = function (processDir) {
    require("@babel/register")({
        // This will override `node_modules` ignoring - you can alternatively pass
        // an array of strings to be explicitly matched or a regex / glob
        // ignore: [],
        only: [/[\\/]es[\\/]/],
        extends: path.join(processDir, "./Web/ClientApp/.babelrc"),
        extensions: ['.js']
    });
    require('@babel/polyfill');

    require('ignore-styles');

    require("tsconfig-paths").register({
        baseUrl: './',
        "paths": {
            "@src/*": ["Web/ClientApp/src/*"],
            "@core/*": ["Web/ClientApp/src/core/*"],
            "@components/*": ["Web/ClientApp/src/components/*"],
            "@antdSvgs/*": ["node_modules/@ant-design/icons/lib/outline/*"]
        }
    });

    require('ts-node').register({
        "baseUrl": "./",
        compilerOptions: {
            "module": "commonjs",
            "esModuleInterop": true,
            "resolveJsonModule": true
        },
        project: path.join(processDir, "./Web/ClientApp/tsconfig.json"),
        transpileOnly: true
    });
}
