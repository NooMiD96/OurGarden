import { IPhoto } from "@src/core/IPhoto";

export interface IProductOption {
  categoryId: string;
  subcategoryId?: string;
  productId?: string;
  alias: string;
  photo?: IPhoto;
  photos?: IPhoto[];
}
