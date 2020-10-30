// ----------------
// #region REDUCER
import { Reducer } from "redux";

import { IPageSeoInformationState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IPageSeoInformationState> = (
  state: IPageSeoInformationState = unloadedState,
  action: KnownAction
) => {
  switch (action.type) {
    case t.GET_PAGE_SEO_INFORMATION: {
      const newState: IPageSeoInformationState = {
        ...state,
        key: action.payload ?? "",
      };

      return newState;
    }

    case t.SET_PAGE_SEO_INFORMATION: {
      const { key, pageSeoInformation } = action.payload;
      const newState: IPageSeoInformationState = {
        ...state,
        key,
      };
      if (pageSeoInformation) {
        newState.pageSeoInformation = pageSeoInformation;
      }

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state;
};
