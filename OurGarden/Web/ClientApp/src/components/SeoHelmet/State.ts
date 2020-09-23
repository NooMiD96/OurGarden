// -----------------
// #region STATE
export interface IPageSeoInformation {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface IPageSeoInformationState {
  pageSeoInformation: IPageSeoInformation;
  key: string;
}

export const unloadedState: IPageSeoInformationState = {
  pageSeoInformation: {
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  },
  key: ""
};
// #endregion
