import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface ICategory {
  categoryId: string;
  alias: string;
  photo: IPhoto;
}

export interface ICategoryDTO {
  categoryId: string | null;
  alias: string;
  file: File;
}

export interface ICategoryState {
  listItem: ICategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ICategoryState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
//#endregion
