// -----------------
// #region STATE
export interface IWrapRequest<T> {
  fetchUrl: string;
  fetchProps: {};
  requestSuccess: (data: T) => void;
  requestError?: () => void;
  controllerName: string;
  apiUrl: string;
  requestErrorAction: () => void;
  requestStart: () => void;
}

export interface IAppState {
  pending: boolean[];
  errorInner: string;
  isPageNotFound: boolean;
}

export const unloadedState: IAppState = {
  pending: [],
  errorInner: "",
  isPageNotFound: false
};
// #endregion
