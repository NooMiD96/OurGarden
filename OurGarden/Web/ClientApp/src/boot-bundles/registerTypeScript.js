/* eslint-disable */
require('ignore-styles');

require("tsconfig-paths").register({
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
});
