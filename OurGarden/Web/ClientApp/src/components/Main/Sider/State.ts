import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface ICategory {
  categoryId: string;
  alias: string;
  photo: IPhoto;
}

export interface ISiderState {
  categoryList: ICategory[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ISiderState = {
  categoryList: [],
  pending: false,
  errorInner: "",
};
//#endregion
