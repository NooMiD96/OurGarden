import { INew } from "./State";
// -----------------
// #region ACTIONS TYPE
export const GET_NEWS_REQUEST = "GET_NEWS_REQUEST";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_ERROR = "GET_NEWS_ERROR";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetNewsRequest {
  type: typeof GET_NEWS_REQUEST;
}
export interface IGetNewsSuccess {
  type: typeof GET_NEWS_SUCCESS;
  payload: INew;
}
export interface IGetNewsError {
  type: typeof GET_NEWS_ERROR;
}
export type TGetNews = IGetNewsRequest | IGetNewsSuccess | IGetNewsError;

type KnownAction = TGetNews;

export default KnownAction;
// #endregion
