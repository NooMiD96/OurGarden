import { IDisplayInfo } from "./Model/IDisplayInfo";
import { IRecord, ITableRecord } from "./Model/ITableRecord";

export const getAdditionalClassName = <T extends IRecord>(
  dataSource: IDisplayInfo<T>[]
) => {
  if (!dataSource || dataSource.length === 0) {
    return "empty-table";
  }

  return dataSource.length > 6 ? "with-pagination" : "without-pagination";
};

// prettier-ignore
export const getRowKey = <T extends IRecord>(record: ITableRecord<T>) => `${record.product.categoryId}-${record.product.subcategoryId}-${record.product.productId}`;
