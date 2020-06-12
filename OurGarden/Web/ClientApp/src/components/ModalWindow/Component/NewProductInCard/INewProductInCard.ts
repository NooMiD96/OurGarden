import { IProduct } from "@src/components/Product/State";

export interface INewProductInCard {
  product?: IProduct;
  closeModal: () => void;
  isModalOpen: boolean;
  onEnter: () => void;
}
