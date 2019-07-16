// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IProductState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IProductState> = (state: IProductState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_PRODUCT_REQUEST:
      return {
        ...state,
        pending: true
      } as IProductState;

    case t.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        pending: false,
        product: action.payload
      } as IProductState;

    case t.GET_PRODUCT_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as IProductState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as IProductState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
