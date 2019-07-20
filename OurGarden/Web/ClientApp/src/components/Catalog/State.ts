import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface ISubcategory {
  subcategoryId: string;
  categoryId: string;
  alias: string;
  photo: IPhoto;
}

export interface ICatalogState {
  subcategoryList: ISubcategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ICatalogState = {
  subcategoryList: [],
  pending: false,
  errorInner: "",
};
//#endregion
