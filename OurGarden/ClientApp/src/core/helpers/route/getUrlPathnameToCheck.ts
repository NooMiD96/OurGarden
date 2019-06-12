import { routesArray } from "@core/constants";

export const getUrlPathnameToCheck = (pathname: string): string => {
  let result = pathname;

  // check if url path include basename
  const startIndexOfUrl = pathname.indexOf("/");
  if (startIndexOfUrl === -1) {
    return routesArray[0];
  } else if (startIndexOfUrl !== 0) {
    result = result.substring(startIndexOfUrl);
  }
  // check if url path include params
  const startIndexOfParams = pathname.indexOf("?");
  if (startIndexOfParams !== -1) {
    result = result.substring(0, startIndexOfParams);
  }

  return result;
};
