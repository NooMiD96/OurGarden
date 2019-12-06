// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { IProductListState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IProductListState> = (
  state: IProductListState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_PRODUCT_LIST_ERROR:
    case t.GET_PRODUCT_LIST_REQUEST: {
      return state;
    }

    case t.GET_PRODUCT_LIST_SUCCESS: {
      const newState: IProductListState = {
        ...state,
        productList: action.payload
      };

      return newState;
    }

    case t.CLEAN_PRODUCT_LIST: {
      const newState: IProductListState = {
        ...state,
        productList: []
      };

      return newState;
    }

    case t.SAVE_SUBCATEGORY: {
      const newState: IProductListState = {
        ...state,
        subcategory: action.payload
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
