import { IPhoto, IMultiplyPhotoDTO } from "@src/core/IPhoto";
import { IDefaultState } from "@src/core/IDefaultState";

// -----------------
// #region STATE
export interface ICategoryDictionary {
  categoryId: string;
  alias: string;
  subcategories: {
    subcategoryId: string;
    alias: string;
  }[];
}

export interface ICategory {
  categoryId: string;
  alias: string;
  isVisible: boolean;
  photos: IPhoto[];
}

export interface ICategoryDTO extends IMultiplyPhotoDTO {
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
