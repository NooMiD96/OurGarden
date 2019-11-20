import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
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

export interface ICategoryDTO {
  categoryId: string | null;
  alias: string;
  isVisible: boolean;

  addFiles: File[];
  removeFiles: string[];
  updateFiles: File[];
}

export interface ICategoryState {
  listItem: ICategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ICategoryState = {
  listItem: [],
  pending: false,
  errorInner: ""
};
//#endregion
