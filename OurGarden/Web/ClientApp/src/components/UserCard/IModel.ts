import { IProduct } from "@components/Product/State";

export interface IOrderUserInformation {
  phone: string;
  FIO: string;
  email: string;
}

export interface IOrderPosition {
  number: number;
  product: IProduct;
}

export interface IOrderModel {
  phone: string;
  FIO: string;
  email: string;
  orderPositions: IOrderPosition[];
}
