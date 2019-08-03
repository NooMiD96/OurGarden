// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IProductState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IProductState> = (state: IProductState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_PRODUCT_LIST_REQUEST:
    case t.GET_CATEGORY_DICTIONARY_LIST_REQUEST:
    case t.ADD_OR_UPDATE_PRODUCT_REQUEST:
    case t.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        pending: true,
      } as IProductState;

    case t.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        listItem: action.payload,
        pending: false,
      } as IProductState;

    case t.GET_CATEGORY_DICTIONARY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        pending: false,
      } as IProductState;

    case t.ADD_OR_UPDATE_PRODUCT_SUCCESS:
    case t.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        pending: false,
      } as IProductState;

    case t.GET_PRODUCT_LIST_ERROR:
    case t.GET_CATEGORY_DICTIONARY_LIST_ERROR:
    case t.ADD_OR_UPDATE_PRODUCT_ERROR:
    case t.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
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
