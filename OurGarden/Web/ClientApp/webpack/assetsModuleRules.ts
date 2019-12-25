/* eslint-disable import/no-extraneous-dependencies */

import StringReplacePlugin from "string-replace-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { RuleSetRule } from "webpack";

const getAssetsModuleRules = (
  env: { [key: string]: string },
  fileNameTemplate: string
): RuleSetRule[] => [
  // remove depence on icon which size >500Kb
  {
    test: /\.js$/,
    enforce: "pre",
    use: StringReplacePlugin.replace({
      replacements: [
        {
          pattern: /import Icon from '\.\.\/icon';/gi,
          replacement: () => "import Icon from '@core/antd/Icon';"
        },
        {
          pattern: /componentWillMount/gi,
          replacement: () => "UNSAFE_componentWillMount"
        },
        {
          pattern: /componentWillReceiveProps/gi,
          replacement: () => "UNSAFE_componentWillReceiveProps"
        }
      ]
    })
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !env || !env.prod
        }
      },
      require.resolve("css-loader")
    ]
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !env || !env.prod
        }
      },
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          prependData: "@import '@src/assets/scss/_variables.scss';"
        }
      }
    ]
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "babel-loader"
      },
      {
        loader: "react-svg-loader",
        options: {
          jsx: true // true outputs JSX tags
        }
      }
    ]
  },
  // https://webpack.js.org/loaders/url-loader/
  // https://webpack.js.org/loaders/file-loader/
  {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: "url-loader",
    options: {
      limit: 10 * 1024,
      name: `${fileNameTemplate}.[ext]`,
      outputPath: "img",
      publicPath: "img/"
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: "file-loader",
    options: {
      limit: 10 * 1024,
      name: `${fileNameTemplate}.[ext]`,
      outputPath: "fonts",
      publicPath: "fonts/"
    }
  }
];

export default getAssetsModuleRules;
