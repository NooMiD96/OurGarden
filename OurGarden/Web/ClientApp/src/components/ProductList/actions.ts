import * as t from "./actionsType";
import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";
import { actionCreators as appActions } from "@components/Main/State/actions";

import { IAppThunkAction } from "@src/Store";
import { IProduct } from "@components/Product/State";
import { ISubcategory } from "../Subcategory/State";
// ----------------
// #region ACTIONS
export const actionsList = {
  getProductListRequest: (): t.IGetProductListRequest => ({
    type: t.GET_PRODUCT_LIST_REQUEST
  }),
  getProductListSuccess: (payload: IProduct[]): t.IGetProductListSuccess => ({
    type: t.GET_PRODUCT_LIST_SUCCESS,
    payload
  }),
  getProductListError: (): t.IGetProductListError => ({
    type: t.GET_PRODUCT_LIST_ERROR
  }),

  cleanProductList: (): t.ICleanProductList => ({
    type: t.CLEAN_PRODUCT_LIST
  }),

  saveSubcategory: (payload: ISubcategory): t.ISaveSubcategory => ({
    type: t.SAVE_SUBCATEGORY,
    payload
  })
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "Product";
export const actionCreators = {
  getProductList: (
    categoryId: string,
    subcategoryId: string
  ): IAppThunkAction<t.TGetProductList | t.ISaveSubcategory> => (
    dispatch,
    getState
  ) => {
    const apiUrl = "GetProducts";
    const encodedCategoryId = encodeURIComponent(categoryId);
    const encodedSubcategoryId = encodeURIComponent(subcategoryId);

    const fetchUrl = `/api/${controllerName}/${apiUrl}?categoryId=${encodedCategoryId}&subcategoryId=${encodedSubcategoryId}`;
    const fetchProps = {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    };
    const requestStart = () => dispatch(actionsList.getProductListRequest());

    const requestSuccess = (data: ISubcategory & { products: IProduct[] }) => {
      dispatch(
        actionsList.saveSubcategory({
          alias: data.alias,
          categoryId: data.categoryId,
          photos: data.photos,
          subcategoryId: data.subcategoryId,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          seoKeywords: data.seoKeywords,
        })
      );
      dispatch(actionsList.getProductListSuccess(data.products));
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestErrorAction: actionsList.getProductListError,
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
  },
  cleanProductList: actionsList.cleanProductList
};
// #endregion
