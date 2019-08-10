import { INew } from "@components/News/State";

// -----------------
//#region STATE
export interface INewsListState {
  newsList: INew[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: INewsListState = {
  newsList: [],
  pending: false,
  errorInner: "",
};
//#endregion
