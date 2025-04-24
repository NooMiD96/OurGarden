/* eslint-disable import/no-extraneous-dependencies */

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { RuleSetRule } from 'webpack';

const getAssetsModuleRules = (
  fileNameTemplate: string
): RuleSetRule[] => ([
  // https://webpack.js.org/loaders/url-loader/
  // https://webpack.js.org/loaders/file-loader/
  {
    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff)$/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: `${fileNameTemplate}.[ext]`,
    },
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
      require.resolve('css-loader')
    ]
  },
]);

export default getAssetsModuleRules;
