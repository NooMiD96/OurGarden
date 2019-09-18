// ----------------
// #region REDUCER
import { Reducer } from "redux";
import _omit from "lodash.omit";

import { IUserCardState, unloadedState, IUserCardProduct } from "./State";
import KnownAction, * as t from "./actionsType";
import { saveItemToLS, getItemFromLS } from "@src/core/utils/localStorage";

const findProduct = (
  origin: IUserCardProduct,
  target: IUserCardProduct
) => {
  const { product: originProduct } = origin;
  const { product: targetProduct } = target;

  return (
    originProduct.categoryId === targetProduct.categoryId
    && originProduct.subcategoryId === targetProduct.subcategoryId
    && originProduct.productId === targetProduct.productId
  );
};

const getTotalCount = (productList: IUserCardProduct[]) => productList
  .map((x) => x.count)
  .reduce((count, acc) => count + acc, 0);

export const reducer: Reducer<IUserCardState> = (state: IUserCardState = unloadedState, action: KnownAction) => {
  let newState: IUserCardState = state;
  let saveState = true;

  switch (action.type) {
    case t.SEND_ORDER_REQUEST:
      return {
        ...state,
        pending: true
      } as IUserCardState;

    case t.SEND_ORDER_SUCCESS:
      newState = {
        ...state,
        pending: false,
        productList: [],
        totalCount: 0,
      };
      break;

    case t.SEND_ORDER_ERROR:
      return {
        ...state,
        pending: false,
        errorInner: action.errorMessage
      } as IUserCardState;

    case t.ADD_PRODUCT_TO_CARD: {
      const newProductList: IUserCardProduct[] = [];
      let find = false;

      state.productList.forEach((product) => {
        if (findProduct(product, action.payload)) {
          newProductList.push({
            ...product,
            count: product.count + action.payload.count
          });
          find = true;
        } else {
          newProductList.push(product);
        }
      });

      if (!find) {
        newProductList.push(action.payload);
      }

      newState = {
        ...state,
        productList: newProductList,
        totalCount: getTotalCount(newProductList)
      };
      break;
    }

    case t.CHANGE_COUNT_OF_PRODUCT: {
      const newProductList: IUserCardProduct[] = [];

      state.productList.forEach((product) => {
        if (findProduct(product, action.payload)) {
          newProductList.push({
            ...product,
            count: action.payload.count
          });
        } else {
          newProductList.push(product);
        }
      });

      newState = {
        ...state,
        productList: newProductList,
        totalCount: getTotalCount(newProductList)
      };
      break;
    }

    case t.REMOVE_PRODUCT_FROM_CARD: {
      const newProductList = state.productList.filter((item) => action.payload !== item.product);

      newState = {
        ...state,
        productList: newProductList,
        totalCount: getTotalCount(newProductList)
      };
      break;
    }

    case t.CLEAN_PRODUCT_CARD:
      newState = {
        ...state,
        productList: [],
        totalCount: 0
      };
      break;

    case t.CLEAN_ERROR_INNER:
      newState = {
        ...state,
        errorInner: "",
      };
      break;

    case t.LOAD_CARD_FROM_LOCALSTATE:
      return {
        ...state,
        ...getItemFromLS("UserCard"),
      } as IUserCardState;

    default:
      // eslint-disable-next-line
      const exhaustiveCheck: never = action;
      saveState = false;
  }

  if (saveState) {
    saveItemToLS(
      "UserCard",
      _omit(newState, ["pending", "errorInner"])
    );
  }

  return newState;
};
