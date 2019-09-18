import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { INew } from "@components/News/State";

// ----------------
//#region ACTIONS
export const actionsList = {
  getNewsListRequest: (): t.IGetNewsListRequest => ({
    type: t.GET_NEWS_LIST_REQUEST,
  }),
  getNewsListSuccess: (payload: INew[]): t.IGetNewsListSuccess => ({
    type: t.GET_NEWS_LIST_SUCCESS,
    payload
  }),
  getNewsListError: (errorMessage: string): t.IGetNewsListError => ({
    type: t.GET_NEWS_LIST_ERROR,
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
  getNewsList: (): IAppThunkAction<t.TGetNewsList | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetAllNews";

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<INew[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        value.data.forEach(x => {
          x.date = new Date(x.date);
        });

        dispatch(actionsList.getNewsListSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getNewsListError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getNewsListRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
