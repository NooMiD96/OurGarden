import { IProduct } from "@src/components/Product/State";

export const getProductPhotoSrc = (product: IProduct) => {
  return product.photos && product.photos[0] && product.photos[0].url
};
