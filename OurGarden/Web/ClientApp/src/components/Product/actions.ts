import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";
import { IProduct } from "./State";

// ----------------
//#region ACTIONS
export const actionsList = {
  getProductRequest: (): t.IGetProductRequest => ({
    type: t.GET_PRODUCT_REQUEST,
  }),
  getProductSuccess: (payload: IProduct): t.IGetProductSuccess => ({
    type: t.GET_PRODUCT_SUCCESS,
    payload
  }),
  getProductError: (errorMessage: string): t.IGetProductError => ({
    type: t.GET_PRODUCT_ERROR,
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
  getProduct: (categoryId: string, subcategoryId: string, productId: string): IAppThunkAction<t.TGetProduct | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetProduct";

    dispatch(actionCreators.cleanErrorInner());

    const encodedCategoryId = encodeURIComponent(categoryId);
    const encodedSubcategoryId = encodeURIComponent(subcategoryId);
    const encodedProductId = encodeURIComponent(productId);

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?categoryId=${encodedCategoryId}&subcategoryId=${encodedSubcategoryId}&productId=${encodedProductId}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IProduct>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getProductSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getProductError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getProductRequest());
  },
  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
