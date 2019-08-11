import { INews } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_NEWS_LIST_REQUEST = "GET_NEWS_LIST_REQUEST";
export const GET_NEWS_LIST_SUCCESS = "GET_NEWS_LIST_SUCCESS";
export const GET_NEWS_LIST_ERROR = "GET_NEWS_LIST_ERROR";

export const ADD_OR_UPDATE_NEWS_REQUEST = "ADD_OR_UPDATE_NEWS_REQUEST";
export const ADD_OR_UPDATE_NEWS_SUCCESS = "ADD_OR_UPDATE_NEWS_SUCCESS";
export const ADD_OR_UPDATE_NEWS_ERROR = "ADD_OR_UPDATE_NEWS_ERROR";

export const DELETE_NEWS_REQUEST = "DELETE_NEWS_REQUEST";
export const DELETE_NEWS_SUCCESS = "DELETE_NEWS_SUCCESS";
export const DELETE_NEWS_ERROR = "DELETE_NEWS_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetNewsListRequest { type: typeof GET_NEWS_LIST_REQUEST }
export interface IGetNewsListSuccess { type: typeof GET_NEWS_LIST_SUCCESS; payload: INews[] }
export interface IGetNewsListError { type: typeof GET_NEWS_LIST_ERROR; errorMessage: string }
export type TGetNewsList = IGetNewsListRequest | IGetNewsListSuccess | IGetNewsListError;

export interface IAddOrUpdateNewsRequest { type: typeof ADD_OR_UPDATE_NEWS_REQUEST }
export interface IAddOrUpdateNewsSuccess { type: typeof ADD_OR_UPDATE_NEWS_SUCCESS; payload: boolean }
export interface IAddOrUpdateNewsError { type: typeof ADD_OR_UPDATE_NEWS_ERROR; errorMessage: string }
export type TAddOrUpdateNews = IAddOrUpdateNewsRequest | IAddOrUpdateNewsSuccess | IAddOrUpdateNewsError;

export interface IDeleteNewsRequest { type: typeof DELETE_NEWS_REQUEST }
export interface IDeleteNewsSuccess { type: typeof DELETE_NEWS_SUCCESS; payload: boolean }
export interface IDeleteNewsError { type: typeof DELETE_NEWS_ERROR; errorMessage: string }
export type IDeleteNews = IDeleteNewsRequest | IDeleteNewsSuccess | IDeleteNewsError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetNewsList | TAddOrUpdateNews | IDeleteNews
  | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
