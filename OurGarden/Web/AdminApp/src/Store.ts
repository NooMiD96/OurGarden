import { RouterState } from "connected-react-router";

import { IAccountState } from "@src/components/Account/State";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

import { INewsState } from "@src/components/News/State";
import { reducer as NewsReducer } from "@src/components/News/reducer";

import { ICategoryState } from "@src/components/Category/State";
import { reducer as CategoryReducer } from "@src/components/Category/reducer";

import { ISubcategoryState } from "./components/Subcategory/State";
import { reducer as SubcategoryReducer } from "@src/components/Subcategory/reducer"

import { IProductState } from "@src/components/Product/State";
import { reducer as ProductReducer } from "@src/components/Product/reducer";

import { IOrderState } from "./components/Order/State";
import { reducer as OrderReducer } from "@src/components/Order/reducer";

import { IGalleryState } from "./components/Gallery/State";
import { reducer as GalleryReducer } from "@src/components/Gallery/reducer";

import { IVideoState } from "./components/VideoGallery/State";
import { reducer as VideoReducer } from "@src/components/VideoGallery/reducer";


export interface IApplicationState {
  router: RouterState;

  account: IAccountState;
  gallery: IGalleryState;
  news: INewsState;
  category: ICategoryState;
  subcategory: ISubcategoryState;
  product: IProductState;
  order: IOrderState;
  video: IVideoState;
}

export const reducers = {
  account: AccountReducer,
  gallery: GalleryReducer,
  news: NewsReducer,
  category: CategoryReducer,
  subcategory: SubcategoryReducer,
  product: ProductReducer,
  order: OrderReducer,
  video: VideoReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
