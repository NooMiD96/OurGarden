import { IPhoto } from "@src/core/IPhoto";

export interface ISearchItem {
  categoryId: string;
  subcategoryId?: string;
  productId?: string;
  alias: string;
  photo?: IPhoto;
  photos?: IPhoto[];
}
