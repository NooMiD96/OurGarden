import { IPageInfo } from "@src/core/interfaces/IPageInfo";

// -----------------
// #region ACTIONS TYPE
export const START_REQUEST = "START_REQUEST";
export const CANCEL_REQUEST = "CANCEL_REQUEST";
export const CLEAR_ALL_REQUEST = "CLEAR_ALL_REQUEST";
export const DATA_WAS_GETED = "DATA_WAS_GETED";
export const REQUEST_ERROR = "REQUEST_ERROR";
export const PAGE_NOT_FOUND_ERROR = "PAGE_NOT_FOUND_ERROR";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
export const SET_YANDEX_METRICA_ID = "SET_YANDEX_METRICA_ID";
export const GET_PAGE_INFO_REQUEST = "GET_PAGE_INFO_REQUEST";
export const GET_PAGE_INFO_SUCCESS = "GET_PAGE_INFO_SUCCESS";
export const GET_PAGE_INFO_ERROR = "GET_PAGE_INFO_ERROR";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IStartRequest {
  type: typeof START_REQUEST;
}
export interface ICancelRequest {
  type: typeof CANCEL_REQUEST;
}
export interface IRequestError {
  type: typeof REQUEST_ERROR;
  massageError: string;
}
export type TRequestInformation =
  | IStartRequest
  | ICancelRequest
  | IRequestError;

export interface IClearAllRequest {
  type: typeof CLEAR_ALL_REQUEST;
}
export interface IDataWasGeted {
  type: typeof DATA_WAS_GETED;
  payload: boolean;
}
export interface IPageNotFoundError {
  type: typeof PAGE_NOT_FOUND_ERROR;
  isNotFound: boolean;
}
export interface ICleanErrorInner {
  type: typeof CLEAN_ERROR_INNER;
}

export interface ISetYandexMetricaId {
  type: typeof SET_YANDEX_METRICA_ID;
  id: number;
}

export interface IGetPageInfoRequest {
  type: typeof GET_PAGE_INFO_REQUEST;
  payload: number;
}
export interface IGetPageInfoSuccess {
  type: typeof GET_PAGE_INFO_SUCCESS;
  payload: IPageInfo;
}
export interface IGetPageInfoError {
  type: typeof GET_PAGE_INFO_ERROR;
  payload: string;
}
export type TGetPageInfo =
  | IGetPageInfoRequest
  | IGetPageInfoSuccess
  | IGetPageInfoError;

export type TAppActions =
  | TRequestInformation
  | IClearAllRequest
  | IDataWasGeted
  | IPageNotFoundError
  | ICleanErrorInner
  | ISetYandexMetricaId
  | TGetPageInfo;

type KnownAction = TAppActions;

export default KnownAction;
// #endregion
