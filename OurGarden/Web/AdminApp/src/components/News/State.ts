import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface INews {
  newsId: number;
  title: string;
  date: string;
  alias: string;
  description: string;
  photo: IPhoto;
}

export interface INewsDTO {
  newsId: number;
  title: string;
  description: string;
  file: File;
}

export interface INewsState {
  listItem: INews[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: INewsState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
//#endregion
