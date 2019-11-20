import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import { actionCreators as breadcrumbActions } from "@components/Breadcrumb/actions";

import { IProduct } from "@components/Product/State";
import { ISubcategory } from "../Subcategory/State";
// ----------------
//#region ACTIONS
export const actionsList = {
  getProductListRequest: (): t.IGetProductListRequest => ({
    type: t.GET_PRODUCT_LIST_REQUEST
  }),
  getProductListSuccess: (payload: IProduct[]): t.IGetProductListSuccess => ({
    type: t.GET_PRODUCT_LIST_SUCCESS,
    payload
  }),
  getProductListError: (errorMessage: string): t.IGetProductListError => ({
    type: t.GET_PRODUCT_LIST_ERROR,
    errorMessage
  }),

  cleanProductList: (): t.ICleanProductList => ({
    type: t.CLEAN_PRODUCT_LIST
  }),

  saveSubcategory: (payload: ISubcategory): t.ISaveSubcategory => ({
    type: t.SAVE_SUBCATEGORY,
    payload
  }),
  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER
  })
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Product";
export const actionCreators = {
  getProductList: (
    categoryId: string,
    subcategoryId: string
  ): IAppThunkAction<
    t.TGetProductList | t.ISaveSubcategory | t.ICleanErrorInnerAction
  > => (dispatch, _getState) => {
    const apiUrl = "GetProducts";

    dispatch(actionCreators.cleanErrorInner());

    const encodedCategoryId = encodeURIComponent(categoryId);
    const encodedSubcategoryId = encodeURIComponent(subcategoryId);

    const fetchTask = fetch(
      `/api/${controllerName}/${apiUrl}?categoryId=${encodedCategoryId}&subcategoryId=${encodedSubcategoryId}`,
      {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      }
    )
      .then(responseCatcher)
      .then((value: IResponse<ISubcategory & { products: IProduct[] }>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(
          actionsList.saveSubcategory({
            alias: value.data.alias,
            categoryId: value.data.categoryId,
            photos: value.data.photos,
            subcategoryId: value.data.subcategoryId
          })
        );
        dispatch(actionsList.getProductListSuccess(value.data.products));

        return Promise.resolve();
      })
      .catch((err: Error) =>
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.getProductListError,
          dispatch
        )
      );

    addTask(fetchTask);
    dispatch(actionsList.getProductListRequest());
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
  cleanProductList: actionsList.cleanProductList,
  cleanErrorInner: actionsList.cleanErrorInner
};
//#endregion
