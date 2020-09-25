import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";

import * as t from "./actionsType";
import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";
import {
  IOrderDTO,
  IOrderPositionDTO,
  IOrderUserInformation,
} from "./Model/IModel";
import { IUserCardProduct } from "./State";
import { IProduct } from "@components/Product/State";
import { OrderProductDTO } from "./Model";

// ----------------
// #region ACTIONS
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
    payload,
  }),
  changeCountOfProduct: (
    payload: IUserCardProduct
  ): t.IChangeCountOfProduct => ({
    type: t.CHANGE_COUNT_OF_PRODUCT,
    payload,
  }),
  removeProductFromCard: (payload: IProduct): t.IRemoveProductFromCard => ({
    type: t.REMOVE_PRODUCT_FROM_CARD,
    payload,
  }),
  cleanProductCard: (): t.ICleanProductCard => ({
    type: t.CLEAN_PRODUCT_CARD,
  }),

  loadCardFromLocalstate: (): t.ILoadCardFromLocalstate => ({
    type: t.LOAD_CARD_FROM_LOCALSTATE,
  }),
};
// #endregion
// ----------------
// #region ACTIONS CREATORS
const controllerName = "Order";
export const actionCreators = {
  sendOrder: (
    userInfo: IOrderUserInformation
  ): IAppThunkAction<t.TSendOrder> => (dispatch, getState) => {
    const apiUrl = "AddOrder";
    const { productList } = getState().userCard;

    const bodyModel: IOrderDTO = {
      ...userInfo,
      orderPositions: productList.map(
        (x: IUserCardProduct): IOrderPositionDTO => ({
          number: x.count,
          product: new OrderProductDTO(x.product),
        })
      ),
    };

    // prettier-ignore
    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(bodyModel),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then(responseCatcher)
      .then((value: IResponse<void>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.sendOrderSuccess());

        return Promise.resolve();
      })
      .catch((err: Error) => errorCatcher(
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
  cleanProductCard: actionsList.cleanProductCard,

  loadCardFromLocalstate: actionsList.loadCardFromLocalstate,
};
// #endregion
