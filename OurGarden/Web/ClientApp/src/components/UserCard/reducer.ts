// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IUserCardState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IUserCardState> = (state: IUserCardState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.SEND_ORDER_REQUEST:
      return {
        ...state,
        pending: true
      } as IUserCardState;

    case t.SEND_ORDER_SUCCESS:
      return {
        ...state,
        pending: false,
        productList: []
      } as IUserCardState;

    case t.SEND_ORDER_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as IUserCardState;

    case t.ADD_PRODUCT_TO_CARD: {
      // TODO:
      return {
        ...state
      } as IUserCardState;
    }

    case t.CHANGE_COUNT_OF_PRODUCT: {
      // TODO:
      return {
        ...state
      } as IUserCardState;
    }

    case t.REMOVE_PRODUCT_FROM_CARD: {
      // TODO:
      return {
        ...state
      } as IUserCardState;
    }

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as IUserCardState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
