import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import { ISubcategory } from "./State";
import { IProduct } from "@components/Product/State";

// ----------------
//#region ACTIONS
export const actionsList = {
  getSubcategoryListRequest: (): t.IGetSubcategoryListRequest => ({
    type: t.GET_SUBCATEGORY_LIST_REQUEST,
  }),
  getSubcategoryListSuccess: (payload: ISubcategory[]): t.IGetSubcategoryListSuccess => ({
    type: t.GET_SUBCATEGORY_LIST_SUCCESS,
    payload
  }),
  getSubcategoryListError: (errorMessage: string): t.IGetSubcategoryListError => ({
    type: t.GET_SUBCATEGORY_LIST_ERROR,
    errorMessage,
  }),

  getProductListRequest: (): t.IGetProductListRequest => ({
    type: t.GET_PRODUCT_LIST_REQUEST,
  }),
  getProductListSuccess: (payload: IProduct[]): t.IGetProductListSuccess => ({
    type: t.GET_PRODUCT_LIST_SUCCESS,
    payload
  }),
  getProductListError: (errorMessage: string): t.IGetProductListError => ({
    type: t.GET_PRODUCT_LIST_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Home";
export const actionCreators = {
  getSubcategoryList: (): IAppThunkAction<t.TGetSubcategoryList | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetSubcategoryList";

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<ISubcategory[]>) => {
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
  getProductList: (): IAppThunkAction<t.TGetProductList | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetProductList";

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IProduct[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getProductListSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getProductListError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getProductListRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
