// -----------------
//#region STATE
export interface ICategoryItem {
  id: number;
}

export interface ICategoryState {
  listItem: ICategoryItem[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: ICategoryState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
//#endregion
