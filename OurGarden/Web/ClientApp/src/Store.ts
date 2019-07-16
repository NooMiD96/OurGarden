import { RouterState } from "connected-react-router";

import { IHomeState } from "@components/Home/State";
import { reducer as HomeReducer } from "@components/Home/reducer";

import { ISiderState } from "@components/Main/Sider/State";
import { reducer as SiderReducer } from "@components/Main/Sider/reducer";

import { ICatalogState } from "@components/Catalog/State";
import { reducer as CatalogReducer } from "@components/Catalog/reducer";

import { IProductState } from "@components/Product/State";
import { reducer as ProductReducer } from "@components/Product/reducer";

export interface IApplicationState {
  router: RouterState;

  home: IHomeState;
  sider: ISiderState;

  catalog: ICatalogState;
  product: IProductState;
}

export const reducers = {
  home: HomeReducer,
  sider: SiderReducer,
  catalog: CatalogReducer,
  product: ProductReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
