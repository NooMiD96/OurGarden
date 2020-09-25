import { IProduct } from "@src/components/Product/State";

export interface IOrderProductDTO {
  productId: string;
  subcategoryId: string;
  categoryId: string;
}

export class OrderProductDTO implements IOrderProductDTO {
  constructor(model: IProduct) {
    this.categoryId = model.categoryId;
    this.subcategoryId = model.subcategoryId;
    this.productId = model.productId;
  }

  categoryId: string;

  subcategoryId: string;

  productId: string;
}
