// -----------------
//#region STATE
export interface IClient {
  clientId: number;
  fio: string;
  phone: string;
  isIncludeInMailing: boolean;
  email: string;
}

export interface IClientDTO {
  clientId: number;
  phone: string;
  email: string;
  fio: string;
  isIncludeInMailing: boolean;
}

export interface IClientState {
  clientList: IClient[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IClientState = {
  clientList: [],
  pending: false,
  errorInner: ""
};
//#endregion
