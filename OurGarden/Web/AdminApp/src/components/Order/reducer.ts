// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IOrderState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IOrderState> = (state: IOrderState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_ORDER_LIST_REQUEST:
    case t.ADD_OR_UPDATE_ORDER_REQUEST:
    case t.DELETE_ORDER_REQUEST:
      return {
        ...state,
        pending: true,
      } as IOrderState;

    case t.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        listItem: action.payload,
        pending: false,
      } as IOrderState;

    case t.ADD_OR_UPDATE_ORDER_SUCCESS:
    case t.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        pending: false,
      } as IOrderState;

    case t.GET_ORDER_LIST_ERROR:
    case t.ADD_OR_UPDATE_ORDER_ERROR:
    case t.DELETE_ORDER_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
      } as IOrderState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as IOrderState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
