// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IProductListState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IProductListState> = (
  state: IProductListState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        pending: true
      } as IProductListState;

    case t.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        productList: action.payload
      } as IProductListState;

    case t.GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as IProductListState;

    case t.CLEAN_PRODUCT_LIST:
      return {
        ...state,
        productList: []
      } as IProductListState;

    case t.SAVE_SUBCATEGORY:
      return {
        ...state,
        subcategory: action.payload
      } as IProductListState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: ""
      } as IProductListState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
