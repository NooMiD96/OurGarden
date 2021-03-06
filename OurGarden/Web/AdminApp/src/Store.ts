import { RouterState } from "connected-react-router";

import { IAccountState } from "@src/components/Account/State";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

import { INewsState } from "@src/components/News/State";
import { reducer as NewsReducer } from "@src/components/News/reducer";

import { ICategoryState } from "@src/components/Category/State";
import { reducer as CategoryReducer } from "@src/components/Category/reducer";

import { ISubcategoryState } from "./components/Subcategory/State";
import { reducer as SubcategoryReducer } from "@src/components/Subcategory/reducer";

import { IProductState } from "@src/components/Product/State";
import { reducer as ProductReducer } from "@src/components/Product/reducer";

import { IOrderState } from "./components/Order/State";
import { reducer as OrderReducer } from "@src/components/Order/reducer";

import { IClientState } from "./components/Clients/State";
import { reducer as ClientReducer } from "@src/components/Clients/reducer";

import { IGalleryState } from "./components/Gallery/State";
import { reducer as GalleryReducer } from "@src/components/Gallery/reducer";

import { IPageInfoState } from "./components/PageInfo/State";
import { reducer as PageInfoReducer } from "@src/components/PageInfo/reducer";

export interface IApplicationState {
  router: RouterState;

  account: IAccountState;

  news: INewsState;

  category: ICategoryState;
  subcategory: ISubcategoryState;
  product: IProductState;

  order: IOrderState;
  client: IClientState;

  gallery: IGalleryState;
  pageInfo: IPageInfoState;
}

export const reducers = {
  account: AccountReducer,

  news: NewsReducer,

  category: CategoryReducer,
  subcategory: SubcategoryReducer,
  product: ProductReducer,

  order: OrderReducer,
  client: ClientReducer,

  gallery: GalleryReducer,
  pageInfo: PageInfoReducer,
};

export interface IAppThunkAction<TAction> {
  (
    dispatch: (action: TAction) => void,
    getState: () => IApplicationState
  ): void;
}
