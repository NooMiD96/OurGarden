import * as t from "./actionsType";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";
import { actionCreators as appActions } from "@components/Main/State/actions";

import _omit from "lodash.omit";

import { IAppThunkAction } from "@src/Store";
import { ISubcategory } from "./State";
import { ICategory } from "../Category/State";
// ----------------
// #region ACTIONS
export const actionsList = {
  getSubcategoryListRequest: (): t.IGetSubcategoryListRequest => ({
    type: t.GET_SUBCATEGORY_LIST_REQUEST
  }),
  getSubcategoryListSuccess: (
    payload: ISubcategory[]
  ): t.IGetSubcategoryListSuccess => ({
    type: t.GET_SUBCATEGORY_LIST_SUCCESS,
    payload
  }),
  getSubcategoryListError: (): t.IGetSubcategoryListError => ({
    type: t.GET_SUBCATEGORY_LIST_ERROR
  }),

  saveCategory: (payload: ICategory): t.ISaveCategory => ({
    type: t.SAVE_CATEGORY,
    payload
  })
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "Subcategory";
export const actionCreators = {
  getSubcategoryList: (
    categoryId: string
  ): IAppThunkAction<t.TGetSubcategoryList | t.ISaveCategory> => (
    dispatch,
    getState
  ) => {
    const apiUrl = "GetSubcategories";
    const encodedCategoryId = encodeURIComponent(categoryId);

    const fetchUrl = `/api/${controllerName}/${apiUrl}?categoryId=${encodedCategoryId}`;
    const fetchProps = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    };

    // prettier-ignore
    const requestStart = () => dispatch(actionsList.getSubcategoryListRequest());

    const requestSuccess = (
      data: ICategory & { subcategories: ISubcategory[] }
    ) => {
      dispatch(
        actionsList.saveCategory(
          _omit(data, ["subcategories"])
        )
      );
      dispatch(actionsList.getSubcategoryListSuccess(data.subcategories));
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestErrorAction: actionsList.getSubcategoryListError,
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
