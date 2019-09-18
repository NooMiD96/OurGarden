import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { INew } from "./State";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";
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
const controllerName = "News";
export const actionCreators = {
  getNews: (newsId: string): IAppThunkAction<t.TGetNews | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetNews";

    dispatch(actionCreators.cleanErrorInner());

    const encodedNewsId = encodeURIComponent(newsId);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?alias=${encodedNewsId}`, {
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
  getBreadcrumb: (params: any): IAppThunkAction<any> => (dispatch, getState) => {
    breadcrumbActions.getBreadcrumb({
      controllerName,
      params
    })(dispatch, getState);
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
