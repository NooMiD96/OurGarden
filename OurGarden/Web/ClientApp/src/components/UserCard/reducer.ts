// ----------------
// #region REDUCER
import { Reducer } from "redux";
import _omit from "lodash.omit";

import { saveItemToLS, getItemFromLS } from "@src/core/utils/localStorage";
import {
  getTotalCount,
  addNewProduct,
  changeCountOfProduct,
} from "@src/core/utils/UserCardReducer";

import { IUserCardState, unloadedState, IUserCardProduct } from "./State";
import KnownAction, * as t from "./actionsType";

export const reducer: Reducer<IUserCardState> = (
  state: IUserCardState = unloadedState,
  action: KnownAction
) => {
  let newState: IUserCardState = state;
  let saveState = true;

  switch (action.type) {
    case t.SEND_ORDER_REQUEST: {
      newState = {
        ...state,
        pending: true,
        errorInner: "",
      };

      return newState;
    }

    case t.SEND_ORDER_SUCCESS: {
      newState = {
        ...state,
        productList: [],
        pending: false,
        totalCount: 0,
      };

      break;
    }

    case t.SEND_ORDER_ERROR: {
      newState = {
        ...state,
        pending: false,
        errorInner: action.errorMessage,
      };

      return newState;
    }

    case t.ADD_PRODUCT_TO_CARD: {
      const newProductList = addNewProduct(state.productList, action.payload);

      newState = {
        ...state,
        productList: newProductList,
        totalCount: getTotalCount(newProductList),
      };

      break;
    }

    case t.CHANGE_COUNT_OF_PRODUCT: {
      const newProductList: IUserCardProduct[] = changeCountOfProduct(
        state.productList,
        action.payload
      );

      newState = {
        ...state,
        productList: newProductList,
        totalCount: getTotalCount(newProductList),
      };

      break;
    }

    case t.REMOVE_PRODUCT_FROM_CARD: {
      const newProductList = state.productList.filter(
        (item) => item.product !== action.payload
      );

      newState = {
        ...state,
        productList: newProductList,
        totalCount: getTotalCount(newProductList),
      };

      break;
    }

    case t.CLEAN_PRODUCT_CARD: {
      newState = {
        ...state,
        productList: [],
        totalCount: 0,
      };

      break;
    }

    case t.LOAD_CARD_FROM_LOCALSTATE: {
      newState = {
        ...state,
        ...getItemFromLS("UserCard"),
      };

      return newState;
    }

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
      saveState = false;
  }

  if (saveState) {
    saveItemToLS("UserCard", _omit(newState));
  }

  return newState;
};
