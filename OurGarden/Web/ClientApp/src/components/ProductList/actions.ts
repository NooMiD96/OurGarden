import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";
import { IProduct } from "@components/Product/State";

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

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Home";
export const actionCreators = {
  getProductList: (categoryId: string, subcategoryId: string): IAppThunkAction<t.TGetProductList | t.ICleanErrorInnerAction> => (dispatch, _getState) => {
    const apiUrl = "GetProducts";

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?categoryId=${categoryId}&subcategoryId=${subcategoryId}`, {
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
