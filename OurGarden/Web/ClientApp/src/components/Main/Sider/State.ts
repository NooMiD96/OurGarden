// -----------------
//#region STATE
export interface ICategory {
  id: number;
  title: string;
  date: Date;
  description: string;
  photo: string;
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
