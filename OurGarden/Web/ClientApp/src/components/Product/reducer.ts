// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { IProductState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IProductState> = (
  state: IProductState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_PRODUCT_ERROR:
    case t.GET_PRODUCT_REQUEST: {
      return state;
    }

    case t.GET_PRODUCT_SUCCESS: {
      const newState: IProductState = {
        ...state,
        product: action.payload
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
