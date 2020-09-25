import { IRecord } from "./ITableRecord";

export interface IDisplayInfo<T extends IRecord> {
  product: T;
  productId: string;
  cost: number;
  count: number;
  totalCost: number;
}
