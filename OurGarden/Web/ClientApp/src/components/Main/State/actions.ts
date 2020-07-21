import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";

import { IWrapRequest } from "./State";
import { IPageInfo } from "@src/core/interfaces/IPageInfo";

// ----------------
// #region ACTIONS
export const actionsList = {
  startRequest: (): t.IStartRequest => ({
    type: t.START_REQUEST,
  }),
  cancelRequest: (): t.ICancelRequest => ({
    type: t.CANCEL_REQUEST,
  }),
  clearAllRequest: (): t.IClearAllRequest => ({
    type: t.CLEAR_ALL_REQUEST,
  }),
  dataWasGeted: (isDataWasGeted: boolean): t.IDataWasGeted => ({
    type: t.DATA_WAS_GETED,
    payload: isDataWasGeted,
  }),
  requestError: (massageError: string): t.IRequestError => ({
    type: t.REQUEST_ERROR,
    massageError,
  }),
  pageNotFoundError: (isNotFound: boolean): t.IPageNotFoundError => ({
    type: t.PAGE_NOT_FOUND_ERROR,
    isNotFound,
  }),
  cleanErrorInner: (): t.ICleanErrorInner => ({
    type: t.CLEAN_ERROR_INNER,
  }),
  setYandexMetricaId: (id: number): t.ISetYandexMetricaId => ({
    type: t.SET_YANDEX_METRICA_ID,
    id,
  }),
  getPageInfoRequest: (pageInfoId: number): t.IGetPageInfoRequest => ({
    type: t.GET_PAGE_INFO_REQUEST,
    payload: pageInfoId,
  }),
  getPageInfoSuccess: (payload: IPageInfo): t.IGetPageInfoSuccess => ({
    type: t.GET_PAGE_INFO_SUCCESS,
    payload,
  }),
  getPageInfoError: (error: string): t.IGetPageInfoError => ({
    type: t.GET_PAGE_INFO_ERROR,
    payload: error,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
export const actionCreators = {
  wrapRequest: <T>(
    params: IWrapRequest<T>
  ): IAppThunkAction<t.TRequestInformation | any> => (dispatch) => {
    const {
      fetchUrl,
      fetchProps,
      requestSuccess,
      requestError,
      controllerName,
      apiUrl,
      requestErrorAction,
      requestStart,
      saveRequest = true,
    } = params;

    if (process.env.isWebpackBundle) {
      const fetchTask = fetch(fetchUrl, fetchProps)
        .then((res: Response) => {
          if (res.status === 404) {
            dispatch(actionsList.pageNotFoundError(true));
          }
          return responseCatcher(res);
        })
        .then((value: IResponse<T>) => {
          if (value && value.error) {
            return errorCreater(value.error);
          }

          requestSuccess(value.data);
          dispatch(actionsList.cancelRequest());

          return Promise.resolve();
        })
        .catch((err: Error) => {
          if (requestError) {
            requestError();
          }
          dispatch(actionsList.requestError(err.message));
          errorCatcher(
            controllerName,
            apiUrl,
            err,
            requestErrorAction,
            dispatch
          );
        });

      addTask(fetchTask);

      requestStart();
      dispatch(actionsList.startRequest());

      if (saveRequest) {
        dispatch(actionsList.dataWasGeted(true));
      }
    }
  },

  getPageInfo: (
    pageInfoId: number
  ): IAppThunkAction<
    t.TGetPageInfo | t.TRequestInformation | t.IPageNotFoundError
  > => (dispatch, getState) => {
    const state = getState();
    if (state.app.pageInfoId === pageInfoId) {
      return;
    }

    dispatch(actionsList.getPageInfoRequest(pageInfoId));
    const controllerName = "Home";
    const apiUrl = "GetPageInfo";

    const fetchUrl = `/api/${controllerName}/${apiUrl}?pageInfoId=${pageInfoId}`;
    const fetchProps = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    const fetchTask = fetch(fetchUrl, fetchProps as any)
      .then((res: Response) => {
        if (res.status === 404) {
          dispatch(actionsList.pageNotFoundError(true));
        }
        return responseCatcher(res);
      })
      .then((value: IResponse<IPageInfo>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getPageInfoSuccess(value.data));
        dispatch(actionsList.cancelRequest());

        return Promise.resolve();
      })
      .catch((err: Error) => {
        dispatch(actionsList.requestError(err.message));
        dispatch(actionsList.getPageInfoError(err.message));
        errorCatcher(controllerName, apiUrl, err);
      });

    addTask(fetchTask);
    dispatch(actionsList.startRequest());
  },

  startRequest: actionsList.startRequest,
  cancelRequest: actionsList.cancelRequest,
  clearAllRequest: actionsList.clearAllRequest,
  dataWasGeted: actionsList.dataWasGeted,
  requestError: actionsList.requestError,
  pageNotFoundError: actionsList.pageNotFoundError,
  cleanErrorInner: actionsList.cleanErrorInner,
  setYandexMetricaId: actionsList.setYandexMetricaId,
};
// #endregion
