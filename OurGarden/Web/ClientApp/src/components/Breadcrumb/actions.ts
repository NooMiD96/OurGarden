import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { IBreadcrumb } from "./State";

import qs from "querystring";

// ----------------
// #region ACTIONS
export const actionsList = {
  getBreadcrumb: (): t.IGetBreadcrumb => ({
    type: t.GET_BREADCRUMB
  }),
  setBreadcrumb: (payload: { breadcrumb: IBreadcrumb[], key: string }): t.ISetBreadcrumb => ({
    type: t.SET_BREADCRUMB,
    payload
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
export const actionCreators = {
  getBreadcrumb: ({
    controllerName,
    key = '',
    params = {}
  }: {
      controllerName: string,
      key?: string,
      params?: any,
  }): IAppThunkAction<t.IGetBreadcrumb | t.ISetBreadcrumb> => (dispatch, getState) => {
    const paramString = qs.stringify(params);
    const currentKey = getState().breadcrumb.key;
    
    if (!key) {
      key = paramString;
    }

    if (currentKey === key) {
      return;
    }

    dispatch(actionsList.getBreadcrumb());

    const fetchTask = fetch(`/api/${controllerName}/GetBreadcrumb?${paramString}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IBreadcrumb[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(
          actionsList.setBreadcrumb({
            breadcrumb: value.data,
            key
          })
        );

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        "GetBreadcrumb",
        err,
        () => {},
        dispatch
      ));

    addTask(fetchTask);
  },
  setBreadcrumb: actionsList.setBreadcrumb,
};
// #endregion
