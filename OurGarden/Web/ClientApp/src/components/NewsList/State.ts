import { INew } from "@components/News/State";

// -----------------
// #region STATE
export interface INewsListState {
  newsList: INew[];
}

export const unloadedState: INewsListState = {
  newsList: []
};
// #endregion
