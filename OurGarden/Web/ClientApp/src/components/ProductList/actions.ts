import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";
import { IProduct } from "@components/Product/State";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";
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


  cleanProductList: (): t.ICleanProductList => ({
    type: t.CLEAN_PRODUCT_LIST,
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
  getProductList: (categoryId: string, subcategoryId: string): IAppThunkAction<t.TGetProductList | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetProducts";

    dispatch(actionCreators.cleanErrorInner());

    const encodedCategoryId = encodeURIComponent(categoryId);
    const encodedSubcategoryId = encodeURIComponent(subcategoryId);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?categoryId=${encodedCategoryId}&subcategoryId=${encodedSubcategoryId}`, {
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
  getBreadcrumb: (params: any): IAppThunkAction<any> => (dispatch, getState) => {
    breadcrumbActions.getBreadcrumb(controllerName, params)(dispatch, getState);
  },
  cleanProductList: actionsList.cleanProductList,
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
