import { RouterState } from "connected-react-router";

import { IAccountState } from "@src/components/Account/State";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

import { ICategoryState } from "@src/components/Category/State";
import { reducer as CategoryReducer } from "@src/components/Category/reducer";

import { ISubcategoryState } from "./components/Subcategory/State";
import { reducer as SubcategoryReducer } from "@src/components/Subcategory/reducer"

import { IProductState } from "@src/components/Product/State";
import { reducer as ProductReducer } from "@src/components/Product/reducer";

import { IOrderState } from "./components/Order/State";
import { reducer as OrderReducer } from "@src/components/Order/reducer";


export interface IApplicationState {
  router: RouterState;

  account: IAccountState;
  category: ICategoryState;
  subcategory: ISubcategoryState;
  product: IProductState;
  order: IOrderState;
}

export const reducers = {
  account: AccountReducer,
  category: CategoryReducer,
  subcategory: SubcategoryReducer,
  product: ProductReducer,
  order: OrderReducer
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
