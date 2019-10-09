import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";
import { ISubcategory } from "./State";
import { ICategory } from "../Category/State";
// ----------------
//#region ACTIONS
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
  getSubcategoryListError: (
    errorMessage: string
  ): t.IGetSubcategoryListError => ({
    type: t.GET_SUBCATEGORY_LIST_ERROR,
    errorMessage
  }),

  saveCategory: (payload: ICategory): t.ISaveCategory => ({
    type: t.SAVE_CATEGORY,
    payload
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER
  })
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Subcategory";
export const actionCreators = {
  getSubcategoryList: (
    categoryId: string
  ): IAppThunkAction<
    t.TGetSubcategoryList | t.ISaveCategory | t.ICleanErrorInnerAction
  > => (dispatch, _getState) => {
    const apiUrl = "GetSubcategories";

    dispatch(actionCreators.cleanErrorInner());

    const encodedCategoryId = encodeURIComponent(categoryId);

    const fetchTask = fetch(
      `/api/${controllerName}/${apiUrl}?categoryId=${encodedCategoryId}`,
      {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      }
    )
      .then(responseCatcher)
      .then(
        (value: IResponse<ICategory & { subcategories: ISubcategory[] }>) => {
          if (value && value.error) {
            return errorCreater(value.error);
          }

          dispatch(
            actionsList.saveCategory({
              alias: value.data.alias,
              categoryId: value.data.categoryId,
              photo: value.data.photo
            })
          );
          dispatch(
            actionsList.getSubcategoryListSuccess(value.data.subcategories)
          );

          return Promise.resolve();
        }
      )
      .catch((err: Error) =>
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.getSubcategoryListError,
          dispatch
        )
      );

    addTask(fetchTask);
    dispatch(actionsList.getSubcategoryListRequest());
  },
  getBreadcrumb: (params: any): IAppThunkAction<any> => (
    dispatch,
    getState
  ) => {
    breadcrumbActions.getBreadcrumb({
      controllerName,
      params
    })(dispatch, getState);
  },
  cleanErrorInner: actionsList.cleanErrorInner
};
//#endregion
