import { IUserCardProduct } from "./State";
import { IProduct } from "@components/Product/State";

// -----------------
// #region ACTIONS TYPE
export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";

export const ADD_PRODUCT_TO_CARD = "ADD_PRODUCT_TO_CARD";
export const CHANGE_COUNT_OF_PRODUCT = "CHANGE_COUNT_OF_PRODUCT";
export const REMOVE_PRODUCT_FROM_CARD = "REMOVE_PRODUCT_FROM_CARD";
export const CLEAN_PRODUCT_CARD = "CLEAN_PRODUCT_CARD";

export const SET_ORDER_ID = "SET_ORDER_ID";
export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";

export const LOAD_CARD_FROM_LOCALSTATE = "LOAD_CARD_FROM_LOCALSTATE";
// #endregion
// -----------------
// #region ACTIONS INTERFACE
export interface ISendOrderRequest {
  type: typeof SEND_ORDER_REQUEST;
}
export interface ISendOrderSuccess {
  type: typeof SEND_ORDER_SUCCESS;
  payload: number;
}
export interface ISendOrderError {
  type: typeof SEND_ORDER_ERROR;
  errorMessage: string;
}
export type TSendOrder =
  | ISendOrderRequest
  | ISendOrderSuccess
  | ISendOrderError;

export interface IAddProductToCard {
  type: typeof ADD_PRODUCT_TO_CARD;
  payload: { count: number; product: IProduct };
}
export interface IChangeCountOfProduct {
  type: typeof CHANGE_COUNT_OF_PRODUCT;
  payload: IUserCardProduct;
}
export interface IRemoveProductFromCard {
  type: typeof REMOVE_PRODUCT_FROM_CARD;
  payload: IProduct;
}
export interface ICleanProductCard {
  type: typeof CLEAN_PRODUCT_CARD;
}

export interface ISetOrderId {
  type: typeof SET_ORDER_ID;
  payload?: number;
}
export interface ICleanErrorInner {
  type: typeof CLEAN_ERROR_INNER;
}

export interface ILoadCardFromLocalstate {
  type: typeof LOAD_CARD_FROM_LOCALSTATE;
}

type KnownAction =
  | TSendOrder
  | IAddProductToCard
  | IRemoveProductFromCard
  | IChangeCountOfProduct
  | ICleanProductCard
  | ISetOrderId
  | ICleanErrorInner
  | ILoadCardFromLocalstate;

export default KnownAction;
// #endregion
