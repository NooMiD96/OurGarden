// ----------------
//#region REDUCER
import { Reducer } from "redux";

import { IVideoState, unloadedState } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IVideoState> = (state: IVideoState = unloadedState, action: KnownAction) => {
  switch (action.type) {
    case t.GET_VIDEO_LIST_REQUEST:
    case t.ADD_OR_UPDATE_VIDEO_REQUEST:
    case t.DELETE_VIDEO_REQUEST:
      return {
        ...state,
        pending: true,
      } as IVideoState;

    case t.GET_VIDEO_LIST_SUCCESS:
      return {
        ...state,
        listItem: action.payload,
        pending: false,
      } as IVideoState;

    case t.ADD_OR_UPDATE_VIDEO_SUCCESS:
    case t.DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        pending: false,
      } as IVideoState;

    case t.GET_VIDEO_LIST_ERROR:
    case t.ADD_OR_UPDATE_VIDEO_ERROR:
    case t.DELETE_VIDEO_ERROR:
      return {
        ...state,
        errorInner: action.errorMessage,
        pending: false,
      } as IVideoState;

    case t.CLEAN_ERROR_INNER:
      return {
        ...state,
        errorInner: "",
      } as IVideoState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
  }

  return state || unloadedState;
};
