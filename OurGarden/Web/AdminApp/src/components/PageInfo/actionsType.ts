import { IPageInfo } from "./State";

// -----------------
// #region ACTIONS TYPE
export const GET_PAGE_INFO_LIST_REQUEST = "GET_PAGE_INFO_LIST_REQUEST";
export const GET_PAGE_INFO_LIST_SUCCESS = "GET_PAGE_INFO_LIST_SUCCESS";
export const GET_PAGE_INFO_LIST_ERROR = "GET_PAGE_INFO_LIST_ERROR";

// prettier-ignore
export const ADD_OR_UPDATE_PAGE_INFO_REQUEST = "ADD_OR_UPDATE_PAGE_INFO_REQUEST";
// prettier-ignore
export const ADD_OR_UPDATE_PAGE_INFO_SUCCESS = "ADD_OR_UPDATE_PAGE_INFO_SUCCESS";
export const ADD_OR_UPDATE_PAGE_INFO_ERROR = "ADD_OR_UPDATE_PAGE_INFO_ERROR";

export const DELETE_PAGE_INFO_REQUEST = "DELETE_PAGE_INFO_REQUEST";
export const DELETE_PAGE_INFO_SUCCESS = "DELETE_PAGE_INFO_SUCCESS";
export const DELETE_PAGE_INFO_ERROR = "DELETE_PAGE_INFO_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetPageInfoListRequest {
  type: typeof GET_PAGE_INFO_LIST_REQUEST;
}
export interface IGetPageInfoListSuccess {
  type: typeof GET_PAGE_INFO_LIST_SUCCESS;
  payload: IPageInfo[];
}
export interface IGetPageInfoListError {
  type: typeof GET_PAGE_INFO_LIST_ERROR;
  errorMessage: string;
}
export type TGetPageInfoList =
  | IGetPageInfoListRequest
  | IGetPageInfoListSuccess
  | IGetPageInfoListError;

export interface IAddOrUpdatePageInfoRequest {
  type: typeof ADD_OR_UPDATE_PAGE_INFO_REQUEST;
}
export interface IAddOrUpdatePageInfoSuccess {
  type: typeof ADD_OR_UPDATE_PAGE_INFO_SUCCESS;
  payload: boolean;
}
export interface IAddOrUpdatePageInfoError {
  type: typeof ADD_OR_UPDATE_PAGE_INFO_ERROR;
  errorMessage: string;
}
export type TAddOrUpdatePageInfo =
  | IAddOrUpdatePageInfoRequest
  | IAddOrUpdatePageInfoSuccess
  | IAddOrUpdatePageInfoError;

export interface IDeletePageInfoRequest {
  type: typeof DELETE_PAGE_INFO_REQUEST;
}
export interface IDeletePageInfoSuccess {
  type: typeof DELETE_PAGE_INFO_SUCCESS;
  payload: boolean;
}
export interface IDeletePageInfoError {
  type: typeof DELETE_PAGE_INFO_ERROR;
  errorMessage: string;
}
export type IDeletePageInfo =
  | IDeletePageInfoRequest
  | IDeletePageInfoSuccess
  | IDeletePageInfoError;

export interface ICleanErrorInnerAction {
  type: typeof CLEAN_ERROR_INNER;
}

type KnownAction =
  | TGetPageInfoList
  | TAddOrUpdatePageInfo
  | IDeletePageInfo
  | ICleanErrorInnerAction;

export default KnownAction;
// #endregion
