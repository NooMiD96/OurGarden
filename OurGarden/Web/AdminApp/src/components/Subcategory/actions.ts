import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { ISubcategory, ISubcategoryDTO, IResponseData } from "./State";

// ----------------
//#region ACTIONS
export const actionsList = {
  getSubcategoryListRequest: (): t.IGetSubcategoryListRequest => ({
    type: t.GET_SUBCATEGORY_LIST_REQUEST,
  }),
  getSubcategoryListSuccess: (payload: IResponseData): t.IGetSubcategoryListSuccess => ({
    type: t.GET_SUBCATEGORY_LIST_SUCCESS,
    payload
  }),
  getSubcategoryListError: (errorMessage: string): t.IGetSubcategoryListError => ({
    type: t.GET_SUBCATEGORY_LIST_ERROR,
    errorMessage,
  }),

  addOrUpdateSubcategoryRequest: (): t.IAddOrUpdateSubcategoryRequest => ({
    type: t.ADD_OR_UPDATE_SUBCATEGORY_REQUEST,
  }),
  addOrUpdateSubcategorySuccess: (payload: boolean): t.IAddOrUpdateSubcategorySuccess => ({
    type: t.ADD_OR_UPDATE_SUBCATEGORY_SUCCESS,
    payload
  }),
  addOrUpdateSubcategoryError: (errorMessage: string): t.IAddOrUpdateSubcategoryError => ({
    type: t.ADD_OR_UPDATE_SUBCATEGORY_ERROR,
    errorMessage,
  }),

  deleteSubcategoryRequest: (): t.IDeleteSubcategoryRequest => ({
    type: t.DELETE_SUBCATEGORY_REQUEST,
  }),
  deleteSubcategorySuccess: (payload: boolean): t.IDeleteSubcategorySuccess => ({
    type: t.DELETE_SUBCATEGORY_SUCCESS,
    payload
  }),
  deleteSubcategoryError: (errorMessage: string): t.IDeleteSubcategoryError => ({
    type: t.DELETE_SUBCATEGORY_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Subcategory";
export const actionCreators = {
  getSubcategoryList: (): IAppThunkAction<t.TGetSubcategoryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetAll";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IResponseData>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getSubcategoryListSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getSubcategoryListError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getSubcategoryListRequest());
  },
  AddOrUpdateSubcategory: (data: ISubcategoryDTO): IAppThunkAction<t.TAddOrUpdateSubcategory | t.TGetSubcategoryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
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
      .then((value: IResponse<ISubcategory[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdateSubcategorySuccess(true));
        actionCreators.getSubcategoryList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateSubcategoryError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateSubcategoryRequest());
  },
  RemoveSubcategory: (data: string): IAppThunkAction<t.IDeleteSubcategory | t.TGetSubcategoryList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
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
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteSubcategorySuccess(true));
        actionCreators.getSubcategoryList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateSubcategoryError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteSubcategoryRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
