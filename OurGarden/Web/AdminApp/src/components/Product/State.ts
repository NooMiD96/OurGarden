import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IItemDictionary } from "@components/Category/State";
import { IDefaultState } from "@src/core/IDefaultState";
import { ISeoParams } from "@src/core/ISeoParams";

// -----------------
// #region STATE
export interface IProduct extends ISeoParams {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  isVisible: boolean;
  price: number;
  description: string;
  photos: IPhoto[];
}

export interface IProductDTO extends IMultiplyPhotoDTO, ISeoParams {
  categoryId: string | null;
  subcategoryId: string | null;
  productId: string | null;

  newCategoryId: string;
  newSubcategoryId: string;

  alias: string;
  isVisible: boolean;
  price: number;
  description: string;
}

export interface IProductState extends IDefaultState {
  listItem: IProduct[];
  categoryList: IItemDictionary[];
}

export const unloadedState: IProductState = {
  listItem: [],
  categoryList: [],
  pending: false,
  errorInner: ""
};
// #endregion
