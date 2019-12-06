// -----------------
// #region ACTIONS TYPE
export const START_REQUEST = "START_REQUEST";
export const CANCEL_REQUEST = "CANCEL_REQUEST";
export const CLEAR_ALL_REQUEST = "CLEAR_ALL_REQUEST";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const PAGE_NOT_FOUND_ERROR = "PAGE_NOT_FOUND_ERROR";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IStartRequest {
  type: typeof START_REQUEST;
}
export interface ICancelRequest {
  type: typeof CANCEL_REQUEST;
}
export interface IClearAllRequest {
  type: typeof CLEAR_ALL_REQUEST;
}
export interface IRequestError {
  type: typeof REQUEST_ERROR;
  massageError: string;
}
export interface IPageNotFoundError {
  type: typeof PAGE_NOT_FOUND_ERROR;
  isNotFound: boolean;
}
export interface ICleanErrorInner {
  type: typeof CLEAN_ERROR_INNER;
}

export type TAppActions =
  | IStartRequest
  | ICancelRequest
  | IClearAllRequest
  | IRequestError
  | IPageNotFoundError
  | ICleanErrorInner;

type KnownAction = TAppActions;

export default KnownAction;
// #endregion
