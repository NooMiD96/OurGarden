import { IOrderProductDTO } from "./OrderProductDTO";

export interface IOrderDTO extends IOrderUserInformation {
  orderPositions: IOrderPositionDTO[];
}

export interface IOrderUserInformation {
  phone: string;
  FIO: string;
  email: string;
}

export interface IOrderPositionDTO {
  number: number;
  product: IOrderProductDTO;
}
