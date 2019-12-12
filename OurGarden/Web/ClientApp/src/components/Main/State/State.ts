// -----------------
// #region STATE
export interface IWrapRequest<T> {
  fetchUrl: string;
  fetchProps: {};
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
}

export const unloadedState: IAppState = {
  pending: [],
  isDataWasGeted: false,
  errorInner: "",
  isPageNotFound: false
};
// #endregion
