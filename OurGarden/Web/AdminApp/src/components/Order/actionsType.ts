import { IOrder, IOrderStatus } from "./State";

// -----------------
//#region ACTIONS TYPE
export const GET_ORDER_LIST_REQUEST = "GET_ORDER_LIST_REQUEST";
export const GET_ORDER_LIST_SUCCESS = "GET_ORDER_LIST_SUCCESS";
export const GET_ORDER_LIST_ERROR = "GET_ORDER_LIST_ERROR";

export const ADD_OR_UPDATE_ORDER_REQUEST = "ADD_OR_UPDATE_ORDER_REQUEST";
export const ADD_OR_UPDATE_ORDER_SUCCESS = "ADD_OR_UPDATE_ORDER_SUCCESS";
export const ADD_OR_UPDATE_ORDER_ERROR = "ADD_OR_UPDATE_ORDER_ERROR";

export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_ERROR = "DELETE_ORDER_ERROR";

export const CLEAN_ERROR_INNER = "CLEAN_ERROR_INNER";
//#endregion
// -----------------
//#region ACTIONS INTERFACE
export interface IGetOrderListRequest { type: typeof GET_ORDER_LIST_REQUEST }
export interface IGetOrderListSuccess { type: typeof GET_ORDER_LIST_SUCCESS; payload: {orders: IOrder[]; statusList: IOrderStatus[]} }
export interface IGetOrderListError { type: typeof GET_ORDER_LIST_ERROR; errorMessage: string }
export type TGetOrderList = IGetOrderListRequest | IGetOrderListSuccess | IGetOrderListError;

export interface IAddOrUpdateOrderRequest { type: typeof ADD_OR_UPDATE_ORDER_REQUEST }
export interface IAddOrUpdateOrderSuccess { type: typeof ADD_OR_UPDATE_ORDER_SUCCESS; payload: boolean }
export interface IAddOrUpdateOrderError { type: typeof ADD_OR_UPDATE_ORDER_ERROR; errorMessage: string }
export type TAddOrUpdateOrder = IAddOrUpdateOrderRequest | IAddOrUpdateOrderSuccess | IAddOrUpdateOrderError;

export interface IDeleteOrderRequest { type: typeof DELETE_ORDER_REQUEST }
export interface IDeleteOrderSuccess { type: typeof DELETE_ORDER_SUCCESS; payload: boolean }
export interface IDeleteOrderError { type: typeof DELETE_ORDER_ERROR; errorMessage: string }
export type IDeleteOrder = IDeleteOrderRequest | IDeleteOrderSuccess | IDeleteOrderError;

export interface ICleanErrorInnerAction { type: typeof CLEAN_ERROR_INNER }

type KnownAction = TGetOrderList | TAddOrUpdateOrder | IDeleteOrder
  | ICleanErrorInnerAction;

export default KnownAction;
//#endregion
