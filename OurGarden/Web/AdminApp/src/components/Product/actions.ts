import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { IProduct, IProductDTO, ICategoryDictionary } from "./State";

// ----------------
//#region ACTIONS
export const actionsList = {
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

  getCategoryDictionaryRequest: (): t.IGetCategoryDictionaryRequest => ({
    type: t.GET_CATEGORY_DICTIONARY_LIST_REQUEST,
  }),
  getCategoryDictionarySuccess: (payload: ICategoryDictionary[]): t.IGetCategoryDictionarySuccess => ({
    type: t.GET_CATEGORY_DICTIONARY_LIST_SUCCESS,
    payload
  }),
  getCategoryDictionaryError: (errorMessage: string): t.IGetCategoryDictionaryError => ({
    type: t.GET_CATEGORY_DICTIONARY_LIST_ERROR,
    errorMessage,
  }),

  addOrUpdateProductRequest: (): t.IAddOrUpdateProductRequest => ({
    type: t.ADD_OR_UPDATE_PRODUCT_REQUEST,
  }),
  addOrUpdateProductSuccess: (payload: boolean): t.IAddOrUpdateProductSuccess => ({
    type: t.ADD_OR_UPDATE_PRODUCT_SUCCESS,
    payload
  }),
  addOrUpdateProductError: (errorMessage: string): t.IAddOrUpdateProductError => ({
    type: t.ADD_OR_UPDATE_PRODUCT_ERROR,
    errorMessage,
  }),

  deleteProductRequest: (): t.IDeleteProductRequest => ({
    type: t.DELETE_PRODUCT_REQUEST,
  }),
  deleteProductSuccess: (payload: boolean): t.IDeleteProductSuccess => ({
    type: t.DELETE_PRODUCT_SUCCESS,
    payload
  }),
  deleteProductError: (errorMessage: string): t.IDeleteProductError => ({
    type: t.DELETE_PRODUCT_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Product";
export const actionCreators = {
  getProductList: (): IAppThunkAction<t.TGetProductList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
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
  getCategoryDictionary: (): IAppThunkAction<t.TGetCategoryDictionary | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetCategoryDictionary";
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
      .then((value: IResponse<ICategoryDictionary[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getCategoryDictionarySuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getCategoryDictionaryError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getCategoryDictionaryRequest());
  },
  addOrUpdateProduct: (data: IProductDTO): IAppThunkAction<t.TAddOrUpdateProduct | t.TGetProductList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
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
      .then((value: IResponse<IProduct[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdateProductSuccess(true));
        actionCreators.getProductList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateProductError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateProductRequest());
  },
  removeProduct: (data: string): IAppThunkAction<t.IDeleteProduct | t.TGetProductList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
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

        dispatch(actionsList.deleteProductSuccess(true));
        actionCreators.getProductList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateProductError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteProductRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
