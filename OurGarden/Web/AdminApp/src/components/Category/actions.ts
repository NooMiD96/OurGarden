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

  addOrUpdateCategoryRequest: (): t.IAddOrUpdateCategoryRequest => ({
    type: t.ADD_OR_UPDATE_CATEGORY_REQUEST,
  }),
  addOrUpdateCategorySuccess: (payload: boolean): t.IAddOrUpdateCategorySuccess => ({
    type: t.ADD_OR_UPDATE_CATEGORY_SUCCESS,
    payload
  }),
  addOrUpdateCategoryError: (errorMessage: string): t.IAddOrUpdateCategoryError => ({
    type: t.ADD_OR_UPDATE_CATEGORY_ERROR,
    errorMessage,
  }),

  deleteCategoryRequest: (): t.IDeleteCategoryRequest => ({
    type: t.DELETE_CATEGORY_REQUEST,
  }),
  deleteCategorySuccess: (payload: boolean): t.IDeleteCategorySuccess => ({
    type: t.DELETE_CATEGORY_SUCCESS,
    payload
  }),
  deleteCategoryError: (errorMessage: string): t.IDeleteCategoryError => ({
    type: t.DELETE_CATEGORY_ERROR,
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
  AddOrUpdateCategory: (data: ICategoryDTO, onSuccess: Function, onError: Function): IAppThunkAction<t.TAddOrUpdateCategory | t.TGetCategoryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "AddOrUpdate";
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
          onError();
          return errorCreater(value.error);
        }


        onSuccess();
        dispatch(actionsList.addOrUpdateCategorySuccess(true));
        actionCreators.getCategoryList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        onError();
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateCategoryError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateCategoryRequest());
  },
  RemoveCategory: (data: string, onError: Function): IAppThunkAction<t.IDeleteCategory | t.TGetCategoryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "Delete";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          onError();
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteCategorySuccess(true));
        actionCreators.getCategoryList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        onError();
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateCategoryError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteCategoryRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
