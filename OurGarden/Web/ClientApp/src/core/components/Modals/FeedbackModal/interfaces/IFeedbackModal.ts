import { IProduct } from "@src/components/Product/State";

export interface IFeedbackModal {
  isModalOpen: boolean;
  onCloseModal: () => void;
  product?: IProduct;
}
