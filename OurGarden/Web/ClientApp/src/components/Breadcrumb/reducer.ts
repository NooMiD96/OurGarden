// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IBreadcrumbState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IBreadcrumbState> = (state: IBreadcrumbState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_BREADCRUMB:
      return {
        ...state,
        breadcrumb: [],
        key: '',
      };

    case t.SET_BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.payload.breadcrumb,
        key: action.payload.key,
      } as IBreadcrumbState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
