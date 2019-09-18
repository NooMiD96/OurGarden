import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { ICategory } from "./State";

// ----------------
// #region ACTIONS
export const actionsList = {
  getCategoryListRequest: (): t.IGetCategoryListRequest => ({
    type: t.GET_CATEGORY_LIST_REQUEST,
  }),
  getCategoryListSuccess: (payload: ICategory[]): t.IGetCategoryListSuccess => ({
    type: t.GET_CATEGORY_LIST_SUCCESS,
    payload
  }),
  getCategoryListError: (errorMessage: string): t.IGetCategoryListError => ({
    type: t.GET_CATEGORY_LIST_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "Category";
export const actionCreators = {
  getCategoryList: (): IAppThunkAction<t.TGetCategoryList | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetCategories";

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<ICategory[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getCategoryListSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getCategoryListError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getCategoryListRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
// #endregion
