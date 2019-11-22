import path from "path";
import { readJson } from "fs-extra";
import { Manifest } from "react-loadable/webpack";

import { BootFuncParams } from "aspnet-prerendering";

//#region Bundle Stat
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
}

let fileStat: Manifest | null = null;

export const getFileStat = async () => {
  const path = getFileStatPath();

  if (fileStat === null) {
    fileStat = (await readJson(path)) as Manifest;
  }

  return fileStat;
}
//#endregion

//#region Visited Pages
const visitedPages: {[key: string]: boolean} = {};

export const isPageVisited = (url: string = "") => {
  const urlSplit = url
    .toLowerCase()
    .slice(1)
    .split('/');

  switch (urlSplit.length) {
    case 0:
      if (!visitedPages['/']) {
        visitedPages['/'] = true;
        return false;
      }
      break;

    case 1:
      if (!visitedPages[urlSplit[0]]) {
        visitedPages[urlSplit[0]] = true;
        return false;
      }
    break;

    default:
      const mainUrl = urlSplit[0];
      if (['catalog', 'news'].includes(mainUrl)) {
        const pageKey = `${mainUrl}/deep=${urlSplit.length - 1}`;
        if (!visitedPages[pageKey]) {
          visitedPages[pageKey] = true;
          return false;
        }
      } else {
        return false;
      }

      break;
  }

  return true;
}
//#endregion

export const getParamsData = (params: BootFuncParams, field: string) => {
  const { data } = params
  
  if (!data || data[field] === undefined) {
    return null;
  }

  return data[field];
}
