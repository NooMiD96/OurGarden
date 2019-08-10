import { INew } from "./State";
// -----------------
//#region ACTIONS TYPE
export const GET_NEWS_REQUEST = "GET_NEWS_REQUEST";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_ERROR = "GET_NEWS_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetNewsRequest { type: typeof GET_NEWS_REQUEST }
export interface IGetNewsSuccess { type: typeof GET_NEWS_SUCCESS; payload: INew }
export interface IGetNewsError { type: typeof GET_NEWS_ERROR; errorMessage: string }
export type TGetNews = IGetNewsRequest | IGetNewsSuccess | IGetNewsError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetNews | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
