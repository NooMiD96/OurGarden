// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { IModalWindowState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IModalWindowState> = (
  state: IModalWindowState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.ADD_PRODUCT_TO_CARD: {
      const newState: IModalWindowState = {
        ...state,
        newProductInCard: action.payload.product,
        ...action.payload.product,
      };

      return newState;
    }

    case t.CLOSE_MODAL_WINDOW: {
      const newState: IModalWindowState = {
        ...unloadedState,
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
