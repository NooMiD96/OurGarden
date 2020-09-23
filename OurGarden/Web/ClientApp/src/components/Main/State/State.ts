import { IPageInfo } from "@src/core/interfaces/IPageInfo";

// -----------------
// #region STATE
export interface IWrapRequest<T> {
  fetchUrl: string;
  fetchProps?: RequestInit;
  requestSuccess: (data: T) => void;
  requestError?: () => void;
  controllerName: string;
  apiUrl: string;
  requestErrorAction?: () => void;
  requestStart: () => void;
  saveRequest?: boolean;
}

export interface IAppState {
  pending: boolean[];
  isDataWasGeted: boolean;
  errorInner: string;
  isPageNotFound: boolean;
  ymId: number;
  pageInfoId: number;
  pageInfo?: IPageInfo;
}

export const unloadedState: IAppState = {
  pending: [],
  isDataWasGeted: false,
  errorInner: "",
  isPageNotFound: false,
  ymId: 0,
  pageInfoId: 0,
  pageInfo: undefined,
};
// #endregion
