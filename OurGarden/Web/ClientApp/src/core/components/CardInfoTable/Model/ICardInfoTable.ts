import { IDisplayInfo } from "./IDisplayInfo";
import { ITableRecord, IRecord } from "./ITableRecord";

export type IChangeCountOfProduct<T extends IRecord> = (
  payload: ITableRecord<T>
) => void;
export type IRemoveProductFromCard<T extends IRecord> = (payload: T) => void;

export interface ICardInfoTable<T extends IRecord> {
  dataSource: IDisplayInfo<T>[];
  changeCountOfProduct: IChangeCountOfProduct<T>;
  removeProductFromCard: IRemoveProductFromCard<T>;
}
