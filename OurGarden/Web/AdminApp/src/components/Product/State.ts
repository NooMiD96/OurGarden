import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface IProduct {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
  descriprion: string;
  photos: IPhoto[];
}

export interface IProductDTO {
  productId: string;
  subcategoryId: string;
  categoryId: string;
  alias: string;
  price: number;
  descriprion: string;
  url: string;
}

export interface IProductState {
  listItem: IProduct[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IProductState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
//#endregion
