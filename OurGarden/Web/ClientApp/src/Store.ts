import { RouterState } from "connected-react-router";

import { IHomeState } from "@components/Home/State";
import { reducer as HomeReducer } from "@components/Home/reducer";

import { ISiderState } from "@components/Main/Sider/State";
import { reducer as SiderReducer } from "@components/Main/Sider/reducer";

import { ICatalogState } from "@components/Catalog/State";
import { reducer as CatalogReducer } from "@components/Catalog/reducer";
import { IProductListState } from "@components/ProductList/State";
import { reducer as ProductListReducer } from "@components/ProductList/reducer";
import { IProductState } from "@components/Product/State";
import { reducer as ProductReducer } from "@components/Product/reducer";

import { IUserCardState } from "@components/UserCard/State";
import { reducer as UserCardReducer } from "@components/UserCard/reducer";

export interface IApplicationState {
  router: RouterState;

  home: IHomeState;
  sider: ISiderState;

  catalog: ICatalogState;
  productList: IProductListState;
  product: IProductState;

  userCard: IUserCardState;
}

export const reducers = {
  home: HomeReducer,
  sider: SiderReducer,

  catalog: CatalogReducer,
  productList: ProductListReducer,
  product: ProductReducer,

  userCard: UserCardReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
