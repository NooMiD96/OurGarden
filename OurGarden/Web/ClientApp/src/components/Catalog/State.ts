// -----------------
//#region STATE
export interface IHomeState {
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IHomeState = {
  pending: false,
  errorInner: "",
};
//#endregion
