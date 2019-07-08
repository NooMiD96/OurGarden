/* eslint-disable import/no-extraneous-dependencies */

import StringReplacePlugin from "string-replace-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { RuleSetRule } from "webpack";

const getAssetsModuleRules = (
  env: { [key: string]: string },
  fileNameTemplate: string
): RuleSetRule[] => ([
  // remove depence on icon which size >500Kb
  {
    test: /\.js$/,
    enforce: "pre",
    use: StringReplacePlugin.replace({
      replacements: [{
        pattern: /import Icon from '\.\.\/icon';/ig,
        replacement: () => "import Icon from '@core/antd/Icon';"
      }]
    })
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader"
    ]
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      require.resolve("css-loader")
    ]
  },
  {
    test: /\.svg$/,
    use: "react-svg-loader"
  },
  // https://webpack.js.org/loaders/url-loader/
  // https://webpack.js.org/loaders/file-loader/
  {
    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff)$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: `${fileNameTemplate}.[ext]`,
      outputPath: "img",
      publicPath: "img/",
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: "url-loader",
    options: {
      limit: 10000,
      name: `${fileNameTemplate}.[ext]`,
      outputPath: "fonts",
      publicPath: "fonts/",
    }
  }
]);

export default getAssetsModuleRules;
