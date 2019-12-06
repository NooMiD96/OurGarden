import { IPhoto } from "@src/core/IPhoto";

// -----------------
// #region STATE
export interface ICategory {
  categoryId: string;
  alias: string;
  photos: IPhoto[];
}

export interface ICategoryState {
  categoryList: ICategory[];
}

export const unloadedState: ICategoryState = {
  categoryList: []
};
// #endregion
