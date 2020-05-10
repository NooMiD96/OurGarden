import { IPhoto } from "@src/core/IPhoto";

// -----------------
// #region STATE
export interface INew {
  newsId: number;
  title: string;
  date: Date;
  alias: string;
  description: string;
  photos: IPhoto[];

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface INewsState {
  selectedNew: INew | null;
}

export const unloadedState: INewsState = {
  selectedNew: null
};
// #endregion
