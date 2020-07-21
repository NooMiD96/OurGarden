import { IPhoto } from "@src/core/interfaces/IPhoto";

export interface IProductOption {
  categoryId: string;
  subcategoryId?: string;
  productId?: string;
  alias: string;
  photo?: IPhoto;
  photos?: IPhoto[];
}
