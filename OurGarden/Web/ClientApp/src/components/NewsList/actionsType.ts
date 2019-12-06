import { INew } from "@components/News/State";

// -----------------
// #region ACTIONS TYPE
export const GET_NEWS_LIST_REQUEST = "GET_NEWS_LIST_REQUEST";
export const GET_NEWS_LIST_SUCCESS = "GET_NEWS_LIST_SUCCESS";
export const GET_NEWS_LIST_ERROR = "GET_NEWS_LIST_ERROR";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface IGetNewsListRequest {
  type: typeof GET_NEWS_LIST_REQUEST;
}
export interface IGetNewsListSuccess {
  type: typeof GET_NEWS_LIST_SUCCESS;
  payload: INew[];
}
export interface IGetNewsListError {
  type: typeof GET_NEWS_LIST_ERROR;
}
export type TGetNewsList =
  | IGetNewsListRequest
  | IGetNewsListSuccess
  | IGetNewsListError;

type KnownAction = TGetNewsList;

export default KnownAction;
// #endregion
