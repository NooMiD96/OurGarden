import * as t from "./actionsType";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";
import { actionCreators as appActions } from "@components/Main/State/actions";

import { IAppThunkAction } from "@src/Store";
import { INew } from "./State";

// ----------------
// #region ACTIONS
export const actionsList = {
  getNewsRequest: (): t.IGetNewsRequest => ({
    type: t.GET_NEWS_REQUEST
  }),
  getNewsSuccess: (payload: INew): t.IGetNewsSuccess => ({
    type: t.GET_NEWS_SUCCESS,
    payload
  }),
  getNewsError: (): t.IGetNewsError => ({
    type: t.GET_NEWS_ERROR
  })
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "News";
export const actionCreators = {
  getNews: (newsId: string): IAppThunkAction<t.TGetNews> => (
    dispatch,
    getState
  ) => {
    const apiUrl = "GetNews";
    const encodedNewsId = encodeURIComponent(newsId);

    const fetchUrl = `/api/${controllerName}/${apiUrl}?alias=${encodedNewsId}`;
    const fetchProps = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    };

    const requestStart = () => dispatch(actionsList.getNewsRequest());

    const requestSuccess = (data: INew) => {
      data.date = new Date(data.date);

      dispatch(actionsList.getNewsSuccess(data));
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestErrorAction: actionsList.getNewsError,
      requestStart,
      requestSuccess
    })(dispatch, getState);
  },
  getBreadcrumb: (params: any): IAppThunkAction<any> => (
    dispatch,
    getState
  ) => {
    breadcrumbActions.getBreadcrumb({
      controllerName,
      params
    })(dispatch, getState);
  }
};
// #endregion
