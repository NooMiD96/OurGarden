import { IProduct } from "../Product/State";

// -----------------
//#region STATE
export interface IOrder {
  orderId: number;
  fio: string;
  email: string;
  phone: string;
  date: string;
  totalPrice: number;
  description: string;
  status: IOrderStatus;
  orderPositions: IOrderPosition[];
}

export interface IOrderDTO {
  orderId: number;
  description: string;
  statusId: number;
}

export interface IOrderPosition {
  orderPositionId: number;
  number: number;
  price: number;
  oldProductAlias: string;
  productId: string;
  productAlias: string;
  subcategoryId: string;
  subcategoryAlias: string;
  categoryId: string;
  categoryAlias: string;
  orderId: number;
}

export interface IOrderStatus {
  statusId: number;
  name: string;
}

export interface IOrderState {
  listItem: IOrder[];
  statusList: IOrderStatus[];
  pending: boolean;
  errorInner: string;
}

export const unloadedState: IOrderState = {
  listItem: [],
  statusList: [],
  pending: false,
  errorInner: ""
};
//#endregion
