import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { INew } from "./State";

// ----------------
//#region ACTIONS
export const actionsList = {
  getNewsRequest: (): t.IGetNewsRequest => ({
    type: t.GET_NEWS_REQUEST,
  }),
  getNewsSuccess: (payload: INew): t.IGetNewsSuccess => ({
    type: t.GET_NEWS_SUCCESS,
    payload
  }),
  getNewsError: (errorMessage: string): t.IGetNewsError => ({
    type: t.GET_NEWS_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Home";
export const actionCreators = {
  getNews: (newsId: string): IAppThunkAction<t.TGetNews | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetNews";

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?newsId=${newsId}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<INew>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        value.data.date = new Date(value.data.date);

        dispatch(actionsList.getNewsSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getNewsError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getNewsRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
