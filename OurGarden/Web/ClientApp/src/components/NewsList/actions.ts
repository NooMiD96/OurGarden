import * as t from "./actionsType";
import { actionCreators as appActions } from "@components/Main/State/actions";

import { IAppThunkAction } from "@src/Store";
import { INew } from "@components/News/State";

// ----------------
// #region ACTIONS
export const actionsList = {
  getNewsListRequest: (): t.IGetNewsListRequest => ({
    type: t.GET_NEWS_LIST_REQUEST,
  }),
  getNewsListSuccess: (payload: INew[]): t.IGetNewsListSuccess => ({
    type: t.GET_NEWS_LIST_SUCCESS,
    payload,
  }),
  getNewsListError: (): t.IGetNewsListError => ({
    type: t.GET_NEWS_LIST_ERROR,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "News";
export const actionCreators = {
  getNewsList: (): IAppThunkAction<t.TGetNewsList> => (dispatch, getState) => {
    const apiUrl = "GetAllNews";

    const fetchUrl = `/api/${controllerName}/${apiUrl}`;
    const fetchProps = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    const requestStart = () => dispatch(actionsList.getNewsListRequest());

    const requestSuccess = (data: INew[]) => {
      dispatch(
        actionsList.getNewsListSuccess(
          data.map((x: INew) => ({
            ...x,
            date: new Date(x.date),
          }))
        )
      );
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestErrorAction: actionsList.getNewsListError,
      requestStart,
      requestSuccess,
    })(dispatch, getState);
  },
};
// #endregion
