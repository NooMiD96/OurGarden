import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { INews, INewsDTO } from "./State";
import { generateFormBody } from "@src/core/helpers/request";

// ----------------
//#region ACTIONS
export const actionsList = {
  getNewsListRequest: (): t.IGetNewsListRequest => ({
    type: t.GET_NEWS_LIST_REQUEST
  }),
  getNewsListSuccess: (payload: INews[]): t.IGetNewsListSuccess => ({
    type: t.GET_NEWS_LIST_SUCCESS,
    payload
  }),
  getNewsListError: (errorMessage: string): t.IGetNewsListError => ({
    type: t.GET_NEWS_LIST_ERROR,
    errorMessage
  }),

  addOrUpdateNewsRequest: (): t.IAddOrUpdateNewsRequest => ({
    type: t.ADD_OR_UPDATE_NEWS_REQUEST
  }),
  addOrUpdateNewsSuccess: (payload: boolean): t.IAddOrUpdateNewsSuccess => ({
    type: t.ADD_OR_UPDATE_NEWS_SUCCESS,
    payload
  }),
  addOrUpdateNewsError: (errorMessage: string): t.IAddOrUpdateNewsError => ({
    type: t.ADD_OR_UPDATE_NEWS_ERROR,
    errorMessage
  }),

  deleteNewsRequest: (): t.IDeleteNewsRequest => ({
    type: t.DELETE_NEWS_REQUEST
  }),
  deleteNewsSuccess: (payload: boolean): t.IDeleteNewsSuccess => ({
    type: t.DELETE_NEWS_SUCCESS,
    payload
  }),
  deleteNewsError: (errorMessage: string): t.IDeleteNewsError => ({
    type: t.DELETE_NEWS_ERROR,
    errorMessage
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER
  })
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const apiPrefix = "apiAdmin";
const controllerName = "News";
export const actionCreators = {
  getNewsList: (): IAppThunkAction<
    t.TGetNewsList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "GetAllNews";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/${apiPrefix}/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader
      }
    })
      .then(responseCatcher)
      .then((value: IResponse<INews[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getNewsListSuccess(value.data));

        return Promise.resolve();
      })
      .catch((err: Error) =>
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.getNewsListError,
          dispatch
        )
      );

    addTask(fetchTask);
    dispatch(actionsList.getNewsListRequest());
  },
  addOrUpdateNews: (
    data: INewsDTO
  ): IAppThunkAction<
    t.TAddOrUpdateNews | t.TGetNewsList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "AddOrUpdate";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const formData = generateFormBody(data);

    const fetchTask = fetch(`/${apiPrefix}/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: formData,
      headers: {
        ...xptToHeader
      }
    })
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdateNewsSuccess(true));
        actionCreators.getNewsList()(dispatch, getState);

        return Promise.resolve();
      })
      .catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateNewsError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateNewsRequest());
  },
  removeNews: (
    newsId: string | number
  ): IAppThunkAction<
    t.IDeleteNews | t.TGetNewsList | t.ICleanErrorInnerAction
  > => (dispatch, getState) => {
    const apiUrl = "Delete";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(
      `/${apiPrefix}/${controllerName}/${apiUrl}?newsId=${newsId}`,
      {
        credentials: "same-origin",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          ...xptToHeader
        }
      }
    )
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteNewsSuccess(true));
        actionCreators.getNewsList()(dispatch, getState);

        return Promise.resolve();
      })
      .catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateNewsError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteNewsRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner
};
//#endregion
