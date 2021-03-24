/* eslint-disable import/no-extraneous-dependencies */

import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { RuleSetRule } from "webpack";

const getAssetsModuleRules = (
  env: { [key: string]: string },
  fileNameTemplate: string
): RuleSetRule[] => [
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      require.resolve("css-loader"),
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          additionalData: "@import '@src/assets/scss/_variables.scss';",
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "svg-react-loader",
      },
    ],
  },
  // https://webpack.js.org/loaders/url-loader/
  // https://webpack.js.org/loaders/file-loader/
  {
    test: /\.(png|jpg|jpeg|gif|webp)$/,
    loader: "url-loader",
    options: {
      limit: 10 * 1024,
      name: `${fileNameTemplate}.[ext]`,
      outputPath: "img",
      publicPath: "img/",
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: "file-loader",
    options: {
      limit: 10 * 1024,
      name: `${fileNameTemplate}.[ext]`,
      outputPath: "fonts",
      publicPath: "fonts/",
    },
  },
];

export default getAssetsModuleRules;
