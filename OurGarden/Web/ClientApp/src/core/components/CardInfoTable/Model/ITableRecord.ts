import { IPhotoField } from "@src/core/interfaces/IPhoto";

export interface ITableRecord<T extends IRecord> {
  count: number;
  product: T;
}

export interface IRecord extends IPhotoField {
  productId?: string;
  subcategoryId?: string;
  categoryId?: string;
  alias: string;
}
