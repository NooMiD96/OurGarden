import { RouterState } from "connected-react-router";

import { IAccountState } from "@src/components/Account/State";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

import { ICategoryState } from "@src/components/Category/State";
import { reducer as CategoryReducer } from "@src/components/Category/reducer";

import { IProductState } from "@src/components/Product/State";
import { reducer as ProductReducer } from "@src/components/Product/reducer";

export interface IApplicationState {
  router: RouterState;

  account: IAccountState;
  category: ICategoryState;
  product: IProductState;
}

export const reducers = {
  account: AccountReducer,
  category: CategoryReducer,
  product: ProductReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
