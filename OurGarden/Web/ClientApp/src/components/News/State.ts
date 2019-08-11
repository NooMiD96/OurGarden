import { IPhoto } from "@src/core/IPhoto";

// -----------------
//#region STATE
export interface INew {
  newsId: number;
  title: string;
  date: Date;
  alias: string;
  description: string;
  photo: IPhoto;
}

export interface INewsState {
  selectedNew: INew | null;
  pending: boolean;
  errorInner: string;
}

export const unloadedState: INewsState = {
  selectedNew: null,
  pending: false,
  errorInner: "",
};
//#endregion