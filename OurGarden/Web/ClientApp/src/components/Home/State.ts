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

export interface IHomeState {
  newsList: INew[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IHomeState = {
  newsList: [],
  pending: false,
  errorInner: "",
};
//#endregion
