// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { ICatalogState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<ICatalogState> = (state: ICatalogState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_SUBCATEGORY_LIST_REQUEST:
    case t.GET_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        pending: true,
      } as ICatalogState;

    case t.GET_SUBCATEGORY_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        subcategoryList: action.payload,
      } as ICatalogState;

    case t.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        categoryList: action.payload
      } as ICatalogState;

    case t.GET_SUBCATEGORY_LIST_ERROR:
    case t.GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as ICatalogState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as ICatalogState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
