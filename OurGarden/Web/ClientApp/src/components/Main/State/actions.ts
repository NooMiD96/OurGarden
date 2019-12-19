import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";

import { IWrapRequest } from "./State";

// ----------------
// #region ACTIONS
export const actionsList = {
  startRequest: (): t.IStartRequest => ({
    type: t.START_REQUEST
  }),
  cancelRequest: (): t.ICancelRequest => ({
    type: t.CANCEL_REQUEST
  }),
  clearAllRequest: (): t.IClearAllRequest => ({
    type: t.CLEAR_ALL_REQUEST
  }),
  dataWasGeted: (isDataWasGeted: boolean): t.IDataWasGeted => ({
    type: t.DATA_WAS_GETED,
    payload: isDataWasGeted
  }),
  requestError: (massageError: string): t.IRequestError => ({
    type: t.REQUEST_ERROR,
    massageError
  }),
  pageNotFoundError: (isNotFound: boolean): t.IPageNotFoundError => ({
    type: t.PAGE_NOT_FOUND_ERROR,
    isNotFound
  }),
  cleanErrorInner: (): t.ICleanErrorInner => ({
    type: t.CLEAN_ERROR_INNER
  })
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
export const actionCreators = {
  wrapRequest: <T>(params: IWrapRequest<T>): IAppThunkAction<any> => (
    dispatch
  ) => {
    const {
      fetchUrl,
      fetchProps,
      requestSuccess,
      requestError,
      controllerName,
      apiUrl,
      requestErrorAction,
      requestStart,
      saveRequest = true
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

  startRequest: actionsList.startRequest,
  cancelRequest: actionsList.cancelRequest,
  clearAllRequest: actionsList.clearAllRequest,
  dataWasGeted: actionsList.dataWasGeted,
  requestError: actionsList.requestError,
  pageNotFoundError: actionsList.pageNotFoundError,
  cleanErrorInner: actionsList.cleanErrorInner
};
// #endregion
