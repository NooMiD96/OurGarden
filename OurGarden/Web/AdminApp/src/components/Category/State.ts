import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IDefaultState } from "@src/core/IDefaultState";
import { ISeoParams } from "@src/core/ISeoParams";

// -----------------
// #region STATE
export interface IItemDictionary {
  itemId: string;
  alias: string;
  subDictionary: IItemDictionary[];
}

export interface ICategory extends ISeoParams {
  categoryId: string;
  alias: string;
  isVisible: boolean;
  photos: IPhoto[];
}

export interface ICategoryDTO extends IMultiplyPhotoDTO, ISeoParams {
  categoryId: string | null;
  alias: string;
  isVisible: boolean;
}

export interface ICategoryState extends IDefaultState {
  listItem: ICategory[];
}

export const unloadedState: ICategoryState = {
  listItem: [],
  pending: false,
  errorInner: ""
};
// #endregion
