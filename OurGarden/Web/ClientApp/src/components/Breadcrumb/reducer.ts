// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { IBreadcrumbState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IBreadcrumbState> = (
  state: IBreadcrumbState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_BREADCRUMB: {
      const newState: IBreadcrumbState = {
        ...state,
        breadcrumb: [],
        key: ""
      };

      return newState;
    }

    case t.SET_BREADCRUMB: {
      const newState: IBreadcrumbState = {
        ...state,
        breadcrumb: action.payload.breadcrumb,
        key: action.payload.key
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
