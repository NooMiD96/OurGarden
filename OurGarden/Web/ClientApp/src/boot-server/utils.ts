import path from "path";
import { readJson } from "fs-extra";
import { Manifest } from "react-loadable/webpack";

import { BootFuncParams } from "aspnet-prerendering";

// #region Bundle Stat
let fileStatPath: string | null = null;

export const getFileStatPath = () => {
  const projectDir = process.cwd();

  if (fileStatPath === null) {
    fileStatPath = `${path.join(
      projectDir,
      "./wwwroot/client/client/assets-manifest.json"
    )}`;
  }

  return fileStatPath;
};

let fileStat: Manifest | null = null;

export const getFileStat = async () => {
  const statePath = getFileStatPath();

  if (fileStat === null) {
    // eslint-disable-next-line require-atomic-updates
    fileStat = (await readJson(statePath)) as Manifest;
  }

  return fileStat;
};
// #endregion

export const getParamsData = (params: BootFuncParams, field: string, defaultValue: any = null) => {
  const { data } = params;

  if (!data || data[field] === undefined) {
    return defaultValue;
  }

  return data[field];
};
