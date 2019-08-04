import { IProduct } from "../Product/State";

// -----------------
//#region STATE
export interface IOrder {
  orderId: number;
  status: IOrderStatus;
  phone: string;
  email: string;
  fio: string;
  date: string;
  description: string;
  totalprice: number;
  orderPositions: IOrderPosition[];
}

export interface IOrderDTO {
  orderId: number;
  description: string;
  statusId: number;
}

export interface IOrderPosition {
  orderPositionId: number;
  product: IProduct;
  number: number;
}

export interface IOrderStatus {
  statusId: number;
  name: string;
}

export interface IOrderState {
  listItem: IOrder[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IOrderState = {
  listItem: [],
  pending: false,
  errorInner: "",
};
//#endregion
