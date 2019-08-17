import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface ICategory {
  categoryId: string;
  alias: string;
  photo: IPhoto;
}

export interface ICategoryState {
  categoryList: ICategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ICategoryState = {
  categoryList: [],
  pending: false,
  errorInner: "",
};
//#endregion
