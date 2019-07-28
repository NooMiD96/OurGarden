import { IProduct } from "@components/Product/State";

export interface IOrderUserInformation {
  phone: string;
  FIO: string;
}

export interface IOrderPosition {
  number: number;
  product: IProduct;
}

export interface IOrderModel {
  phone: string;
  FIO: string;
  orderPositions: IOrderPosition[];
}
