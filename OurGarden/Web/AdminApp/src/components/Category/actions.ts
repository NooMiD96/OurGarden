import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { ICategory, ICategoryDTO } from "./State";

// ----------------
//#region ACTIONS
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

  addCategoryRequest: (): t.IAddCategoryRequest => ({
    type: t.ADD_CATEGORY_REQUEST,
  }),
  addCategorySuccess: (payload: boolean): t.IAddCategorySuccess => ({
    type: t.ADD_CATEGORY_SUCCESS,
    payload
  }),
  addCategoryError: (errorMessage: string): t.IAddCategoryError => ({
    type: t.ADD_CATEGORY_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Category";
const defaultControllerName = "Home";
export const actionCreators = {
  getCategoryList: (): IAppThunkAction<t.TGetCategoryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetCategories";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${defaultControllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
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
  AddCategory: (data: ICategoryDTO): IAppThunkAction<t.TAddCategory | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "Add";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<ICategory[]>) => {
        if (value && value.error) {
          debugger;
          return errorCreater(value.error);
        }

        dispatch(actionsList.addCategorySuccess(true));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.addCategoryError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.addCategoryRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
