require('ts-node').register({
    compilerOptions: {
        "module": "commonjs",
        "target": "es5",
        "esModuleInterop": true,
        "resolveJsonModule": true,
    }
})

module.exports = require("./webpack/webpack.config.ts");