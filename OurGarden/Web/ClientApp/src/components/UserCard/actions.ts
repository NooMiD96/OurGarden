import * as t from "./actionsType";
import { actionCreators as appActions } from "@components/Main/State/actions";

import { IAppThunkAction } from "@src/Store";
import { IOrderModel, IOrderPosition, IOrderUserInformation } from "./IModel";
import { IUserCardProduct } from "./State";
import { IProduct } from "@components/Product/State";

// ----------------
// #region ACTIONS
export const actionsList = {
  sendOrderRequest: (): t.ISendOrderRequest => ({
    type: t.SEND_ORDER_REQUEST
  }),
  sendOrderSuccess: (): t.ISendOrderSuccess => ({
    type: t.SEND_ORDER_SUCCESS
  }),
  sendOrderError: (): t.ISendOrderError => ({
    type: t.SEND_ORDER_ERROR
  }),

  addProductToCard: (payload: IUserCardProduct): t.IAddProductToCard => ({
    type: t.ADD_PRODUCT_TO_CARD,
    payload
  }),
  changeCountOfProduct: (
    payload: IUserCardProduct
  ): t.IChangeCountOfProduct => ({
    type: t.CHANGE_COUNT_OF_PRODUCT,
    payload
  }),
  removeProductFromCard: (payload: IProduct): t.IRemoveProductFromCard => ({
    type: t.REMOVE_PRODUCT_FROM_CARD,
    payload
  }),
  сleanProductCard: (): t.ICleanProductCard => ({
    type: t.CLEAN_PRODUCT_CARD
  }),

  loadCardFromLocalstate: (): t.ILoadCardFromLocalstate => ({
    type: t.LOAD_CARD_FROM_LOCALSTATE
  })
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
    const bodyModel: IOrderModel = {
      ...userInfo,
      orderPositions: productList.map(
        (x: IUserCardProduct): IOrderPosition => ({
          number: x.count,
          product: x.product
        })
      )
    };

    const fetchUrl = `/api/${controllerName}/${apiUrl}`;
    const fetchProps = {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(bodyModel),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    };

    const requestStart = () => dispatch(actionsList.sendOrderRequest());

    const requestSuccess = (_: void) => {
      dispatch(actionsList.sendOrderSuccess());
    };

    appActions.wrapRequest({
      apiUrl,
      controllerName,
      fetchProps,
      fetchUrl,
      requestErrorAction: actionsList.sendOrderError,
      requestStart,
      requestSuccess
    })(dispatch, getState);
  },

  addProductToCard: actionsList.addProductToCard,
  removeProductFromCard: actionsList.removeProductFromCard,
  changeCountOfProduct: actionsList.changeCountOfProduct,
  сleanProductCard: actionsList.сleanProductCard,

  loadCardFromLocalstate: actionsList.loadCardFromLocalstate
};
// #endregion
