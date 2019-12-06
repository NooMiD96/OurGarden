import * as t from "./actionsType";
import { actionCreators as appActions } from "@components/Main/State/actions";

import { IAppThunkAction } from "@src/Store";
import { ICategory } from "./State";

// ----------------
// #region ACTIONS
export const actionsList = {
  getCategoryListRequest: (): t.IGetCategoryListRequest => ({
    type: t.GET_CATEGORY_LIST_REQUEST
  }),
  getCategoryListSuccess: (
    payload: ICategory[]
  ): t.IGetCategoryListSuccess => ({
    type: t.GET_CATEGORY_LIST_SUCCESS,
    payload
  }),
  getCategoryListError: (): t.IGetCategoryListError => ({
    type: t.GET_CATEGORY_LIST_ERROR
  })
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "Category";
export const actionCreators = {
  getCategoryList: (): IAppThunkAction<t.TGetCategoryList> => (
    dispatch,
    getState
  ) => {
    const apiUrl = "GetCategories";

    const fetchUrl = `/api/${controllerName}/${apiUrl}`;
    const fetchProps = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    };

    const requestStart = () => dispatch(actionsList.getCategoryListRequest());

    const requestSuccess = (data: ICategory[]) => {
      dispatch(actionsList.getCategoryListSuccess(data));
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestErrorAction: actionsList.getCategoryListError,
      requestStart,
      requestSuccess
    })(dispatch, getState);
  }
};
// #endregion
