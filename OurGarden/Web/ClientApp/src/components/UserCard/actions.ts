import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";
import { IUserOrderModel } from "./IModel";
import { IUserCardProduct } from "./State";
import { IProduct } from "@components/Product/State";

// ----------------
//#region ACTIONS
export const actionsList = {
  sendOrderRequest: (): t.ISendOrderRequest => ({
    type: t.SEND_ORDER_REQUEST,
  }),
  sendOrderSuccess: (): t.ISendOrderSuccess => ({
    type: t.SEND_ORDER_SUCCESS,
  }),
  sendOrderError: (errorMessage: string): t.ISendOrderError => ({
    type: t.SEND_ORDER_ERROR,
    errorMessage,
  }),

  addProductToCard: (payload: IUserCardProduct): t.IAddProductToCard => ({
    type: t.ADD_PRODUCT_TO_CARD,
    payload
  }),
  changeCountOfProduct: (payload: IUserCardProduct): t.IChangeCountOfProduct => ({
    type: t.CHANGE_COUNT_OF_PRODUCT,
    payload
  }),
  removeProductFromCard: (payload: IProduct): t.IRemoveProductFromCard => ({
    type: t.REMOVE_PRODUCT_FROM_CARD,
    payload
  }),
  сleanProductCard: (): t.ICleanProductCard => ({
    type: t.CLEAN_PRODUCT_CARD,
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
  getProduct: (userModel: IUserOrderModel): IAppThunkAction<t.TSendOrder | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetProduct";
    const { productList } = getState().userCard;

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify({
        user: userModel,
        productList
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<void>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.sendOrderSuccess());

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.sendOrderError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.sendOrderRequest());
  },

  addProductToCard: actionsList.addProductToCard,
  removeProductFromCard: actionsList.removeProductFromCard,
  changeCountOfProduct: actionsList.changeCountOfProduct,
  сleanProductCard: actionsList.сleanProductCard,

  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
