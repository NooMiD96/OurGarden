import { IClient } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_CLIENT_LIST_REQUEST = "GET_CLIENT_LIST_REQUEST";
export const GET_CLIENT_LIST_SUCCESS = "GET_CLIENT_LIST_SUCCESS";
export const GET_CLIENT_LIST_ERROR = "GET_CLIENT_LIST_ERROR";

export const ADD_OR_UPDATE_CLIENT_REQUEST = "ADD_OR_UPDATE_CLIENT_REQUEST";
export const ADD_OR_UPDATE_CLIENT_SUCCESS = "ADD_OR_UPDATE_CLIENT_SUCCESS";
export const ADD_OR_UPDATE_CLIENT_ERROR = "ADD_OR_UPDATE_NEWS_ERROR";

export const DELETE_CLIENT_REQUEST = "DELETE_CLIENT_REQUEST";
export const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS";
export const DELETE_CLIENT_ERROR = "DELETE_CLIENT_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetClientListRequest {
  type: typeof GET_CLIENT_LIST_REQUEST;
}
export interface IGetClientListSuccess {
  type: typeof GET_CLIENT_LIST_SUCCESS;
  payload: IClient[];
}
export interface IGetClientListError {
  type: typeof GET_CLIENT_LIST_ERROR;
  errorMessage: string;
}
export type TGetClientList =
  | IGetClientListRequest
  | IGetClientListSuccess
  | IGetClientListError;

export interface IAddOrUpdateClientRequest {
  type: typeof ADD_OR_UPDATE_CLIENT_REQUEST;
}
export interface IAddOrUpdateClientSuccess {
  type: typeof ADD_OR_UPDATE_CLIENT_SUCCESS;
  payload: boolean;
}
export interface IAddOrUpdateClientError {
  type: typeof ADD_OR_UPDATE_CLIENT_ERROR;
  errorMessage: string;
}
export type TAddOrUpdateClient =
  | IAddOrUpdateClientRequest
  | IAddOrUpdateClientSuccess
  | IAddOrUpdateClientError;

export interface IDeleteClientRequest {
  type: typeof DELETE_CLIENT_REQUEST;
}
export interface IDeleteClientSuccess {
  type: typeof DELETE_CLIENT_SUCCESS;
  payload: boolean;
}
export interface IDeleteClientError {
  type: typeof DELETE_CLIENT_ERROR;
  errorMessage: string;
}
export type IDeleteClient =
  | IDeleteClientRequest
  | IDeleteClientSuccess
  | IDeleteClientError;

export interface ICleanErrorInnerAction {
  type: typeof CLEAN_ERROR_INNER;
}

type KnownAction =
  | TGetClientList
  | TAddOrUpdateClient
  | IDeleteClient
  | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
