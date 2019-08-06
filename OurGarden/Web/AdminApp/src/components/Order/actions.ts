import { fetch, addTask } from "domain-task";

import { IAppThunkAction } from "@src/Store";
import { IResponse } from "@core/fetchHelper/IResponse";
import { GetXsrfToHeader } from "@core/helpers/auth/xsrf";

import { errorCatcher, responseCatcher } from "@core/fetchHelper";
import { errorCreater } from "@core/fetchHelper/ErrorCreater";

import * as t from "./actionsType";
import { IOrder, IOrderDTO, IOrderStatus } from "./State";

// ----------------
//#region ACTIONS
export const actionsList = {
  getOrderListRequest: (): t.IGetOrderListRequest => ({
    type: t.GET_ORDER_LIST_REQUEST,
  }),
  getOrderListSuccess: (payload: { orders: IOrder[]; statusList: IOrderStatus[] }): t.IGetOrderListSuccess => ({
    type: t.GET_ORDER_LIST_SUCCESS,
    payload
  }),
  getOrderListError: (errorMessage: string): t.IGetOrderListError => ({
    type: t.GET_ORDER_LIST_ERROR,
    errorMessage,
  }),

  addOrUpdateOrderRequest: (): t.IAddOrUpdateOrderRequest => ({
    type: t.ADD_OR_UPDATE_ORDER_REQUEST,
  }),
  addOrUpdateOrderSuccess: (payload: boolean): t.IAddOrUpdateOrderSuccess => ({
    type: t.ADD_OR_UPDATE_ORDER_SUCCESS,
    payload
  }),
  addOrUpdateOrderError: (errorMessage: string): t.IAddOrUpdateOrderError => ({
    type: t.ADD_OR_UPDATE_ORDER_ERROR,
    errorMessage,
  }),

  deleteOrderRequest: (): t.IDeleteOrderRequest => ({
    type: t.DELETE_ORDER_REQUEST,
  }),
  deleteOrderSuccess: (payload: boolean): t.IDeleteOrderSuccess => ({
    type: t.DELETE_ORDER_SUCCESS,
    payload
  }),
  deleteOrderError: (errorMessage: string): t.IDeleteOrderError => ({
    type: t.DELETE_ORDER_ERROR,
    errorMessage,
  }),

  cleanErrorInner: (): t.ICleanErrorInnerAction => ({
    type: t.CLEAN_ERROR_INNER,
  }),
};
//#endregion
// ----------------
//#region ACTIONS CREATORS
const controllerName = "Order";
export const actionCreators = {
  getOrderList: (): IAppThunkAction<t.TGetOrderList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "GetAll";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<{ orders: IOrder[]; statusList: IOrderStatus[] }>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.getOrderListSuccess(value.data));

        return Promise.resolve();
      }).catch((err: Error) => errorCatcher(
        controllerName,
        apiUrl,
        err,
        actionsList.getOrderListError,
        dispatch
      ));

    addTask(fetchTask);
    dispatch(actionsList.getOrderListRequest());
  },
  UpdateOrder: (data: IOrderDTO): IAppThunkAction<t.TAddOrUpdateOrder | t.TGetOrderList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "Update";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<IOrder[]>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.addOrUpdateOrderSuccess(true));
        actionCreators.getOrderList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateOrderError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.addOrUpdateOrderRequest());
  },
  RemoveOrder: (orderId: number): IAppThunkAction<t.IDeleteOrder | t.TGetOrderList | t.ICleanErrorInnerAction> => (dispatch, getState) => {
    const apiUrl = "Delete";
    const xptToHeader = GetXsrfToHeader(getState);

    dispatch(actionCreators.cleanErrorInner());

    const fetchTask = fetch(`/api/${controllerName}/${apiUrl}?orderId=${orderId}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...xptToHeader,
      },
    })
      .then(responseCatcher)
      .then((value: IResponse<boolean>) => {
        if (value && value.error) {
          return errorCreater(value.error);
        }

        dispatch(actionsList.deleteOrderSuccess(true));
        actionCreators.getOrderList()(dispatch, getState);

        return Promise.resolve();
      }).catch((err: Error) => {
        errorCatcher(
          controllerName,
          apiUrl,
          err,
          actionsList.addOrUpdateOrderError,
          dispatch
        );
      });

    addTask(fetchTask);
    dispatch(actionsList.deleteOrderRequest());
  },

  cleanErrorInner: actionsList.cleanErrorInner,
};
//#endregion
