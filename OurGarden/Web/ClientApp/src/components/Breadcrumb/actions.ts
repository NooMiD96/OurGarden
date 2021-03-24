import * as t from "./actionsType";
import { actionCreators as appActions } from "@components/Main/State/actions";

import { IAppThunkAction } from "@src/Store";
import { IBreadcrumb } from "./State";

import qs from "querystring";

// ----------------
// #region ACTIONS
export const actionsList = {
  getBreadcrumb: (): t.IGetBreadcrumb => ({
    type: t.GET_BREADCRUMB,
  }),
  setBreadcrumb: (payload: {
    breadcrumb: IBreadcrumb[];
    key: string;
  }): t.ISetBreadcrumb => ({
    type: t.SET_BREADCRUMB,
    payload,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
export const actionCreators = {
  getBreadcrumb: ({
    controllerName,
    key = "",
    params = {},
  }: {
    controllerName: string;
    key?: string;
    params?: any;
  }): IAppThunkAction<t.IGetBreadcrumb | t.ISetBreadcrumb> => (
    dispatch,
    getState
  ) => {
    const paramString = qs.stringify(params);
    const currentKey = getState().breadcrumb.key;

    if (!key) {
      // eslint-disable-next-line no-param-reassign
      key = paramString;
    }

    if (currentKey === key) {
      return;
    }

    const apiUrl = "GetBreadcrumb";

    const fetchUrl = `/api/${controllerName}/${apiUrl}?${paramString}`;
    const fetchProps: RequestInit = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    const requestStart = () => dispatch(actionsList.getBreadcrumb());

    const requestSuccess = (data: IBreadcrumb[]) => {
      dispatch(
        actionsList.setBreadcrumb({
          breadcrumb: data,
          key,
        })
      );
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestStart,
      requestSuccess,
    })(dispatch, getState);
  },
  setBreadcrumb: actionsList.setBreadcrumb,
};
// #endregion
