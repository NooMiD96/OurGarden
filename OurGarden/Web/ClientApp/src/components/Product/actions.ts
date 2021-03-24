import * as t from "./actionsType";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";
import { actionCreators as appActions } from "@components/Main/State/actions";

import { IProduct } from "./State";
import { IAppThunkAction } from "@src/Store";
// ----------------
// #region ACTIONS
export const actionsList = {
  getProductRequest: (): t.IGetProductRequest => ({
    type: t.GET_PRODUCT_REQUEST,
  }),
  getProductSuccess: (payload: IProduct): t.IGetProductSuccess => ({
    type: t.GET_PRODUCT_SUCCESS,
    payload,
  }),
  getProductError: (): t.IGetProductError => ({
    type: t.GET_PRODUCT_ERROR,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "Product";
export const actionCreators = {
  getProduct: (
    categoryId: string,
    subcategoryId: string,
    productId: string
  ): IAppThunkAction<t.TGetProduct> => (dispatch, getState) => {
    const apiUrl = "GetProduct";
    const encodedCategoryId = encodeURIComponent(categoryId);
    const encodedSubcategoryId = encodeURIComponent(subcategoryId);
    const encodedProductId = encodeURIComponent(productId);

    const fetchUrl = `/api/${controllerName}/${apiUrl}?categoryId=${encodedCategoryId}&subcategoryId=${encodedSubcategoryId}&productId=${encodedProductId}`;
    const fetchProps: RequestInit = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    const requestStart = () => dispatch(actionsList.getProductRequest());

    const requestSuccess = (data: IProduct) => {
      dispatch(actionsList.getProductSuccess(data));
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestErrorAction: actionsList.getProductError,
      requestStart,
      requestSuccess,
    })(dispatch, getState);
  },
  getBreadcrumb: (params: any): IAppThunkAction<any> => (
    dispatch,
    getState
  ) => {
    breadcrumbActions.getBreadcrumb({
      controllerName,
      params,
    })(dispatch, getState);
  },
};
// #endregion
