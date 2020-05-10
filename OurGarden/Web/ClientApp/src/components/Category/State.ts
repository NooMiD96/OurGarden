import { IPhoto } from "@src/core/IPhoto";

// -----------------
// #region STATE
export interface ICategory {
  categoryId: string;
  alias: string;
  photos: IPhoto[];

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface ICategoryState {
  categoryList: ICategory[];
}

export const unloadedState: ICategoryState = {
  categoryList: []
};
// #endregion
