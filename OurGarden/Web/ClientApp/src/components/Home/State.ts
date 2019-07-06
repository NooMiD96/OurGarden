// -----------------
//#region STATE
export interface INew {
  id: number;
  title: string;
  date: Date;
  description: string;
  photo: string;
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
