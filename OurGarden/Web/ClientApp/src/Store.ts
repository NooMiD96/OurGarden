import { RouterState } from "connected-react-router";

import { INewsListState } from "@components/NewsList/State";
import { reducer as NewsListReducer } from "@components/NewsList/reducer";
import { INewsState } from "@components/News/State";
import { reducer as NewsReducer } from "@components/News/reducer";

import { ICategoryState } from "@components/Category/State";
import { reducer as CategoryReducer } from "@components/Category/reducer";

import { ISubcategoryState } from "@components/Subcategory/State";
import { reducer as SubcategoryReducer } from "@components/Subcategory/reducer";
import { IProductListState } from "@components/ProductList/State";
import { reducer as ProductListReducer } from "@components/ProductList/reducer";
import { IProductState } from "@components/Product/State";
import { reducer as ProductReducer } from "@components/Product/reducer";

import { IUserCardState } from "@components/UserCard/State";
import { reducer as UserCardReducer } from "@components/UserCard/reducer";

export interface IApplicationState {
  router: RouterState;

  newsList: INewsListState;
  news: INewsState;

  category: ICategoryState;
  subcategory: ISubcategoryState;
  productList: IProductListState;
  product: IProductState;

  userCard: IUserCardState;
}

export const reducers = {
  newsList: NewsListReducer,
  news: NewsReducer,

  category: CategoryReducer,
  subcategory: SubcategoryReducer,
  productList: ProductListReducer,
  product: ProductReducer,

  userCard: UserCardReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
