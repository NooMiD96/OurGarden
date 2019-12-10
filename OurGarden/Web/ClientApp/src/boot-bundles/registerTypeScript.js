/* eslint-disable */
module.exports = function(processDir) {
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
            "target": "es5",
            "esModuleInterop": true,
            "resolveJsonModule": true
        },
        project: processDir + "/Web/ClientApp/tsconfig.json",
        transpileOnly: true
    });
}
