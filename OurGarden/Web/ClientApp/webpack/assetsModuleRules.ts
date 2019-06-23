/* eslint-disable import/no-extraneous-dependencies */

import StringReplacePlugin from 'string-replace-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { RuleSetRule } from 'webpack';

const getAssetsModuleRules = (
  fileNameTemplate: string
): RuleSetRule[] => ([
  // remove depence on icon which size >500Kb
  {
    test: /\.js$/,
    enforce: 'pre',
    use: StringReplacePlugin.replace({
      replacements: [{
        pattern: /import Icon from '\.\.\/icon';/ig,
        replacement: () => "import Icon from '@core/antd/Icon';"
      }]
    })
  },
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
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      require.resolve('css-loader')
    ]
  },
]);

export default getAssetsModuleRules;
