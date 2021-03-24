/* eslint-disable import/no-extraneous-dependencies */

import { RuleSetRule } from "webpack";
import { LoaderOptions } from "ts-loader/dist/interfaces";

const getJsModuleRules = (): RuleSetRule[] => [
  // TS module for webpack
  {
    test: /\.(ts|tsx|js|jsx)?$/,
    include: /src/,
    loader: "ts-loader",
    options: <LoaderOptions>{
      allowTsInNodeModules: true,
    },
  },
];

export default getJsModuleRules;
