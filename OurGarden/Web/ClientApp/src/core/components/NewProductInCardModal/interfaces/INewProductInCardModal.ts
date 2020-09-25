import { TProductItem } from "@src/core/helpers/linkGenerator/ILinkGenerator";

export interface INewProductInCardModal {
  product?: TProductItem & { alias?: string };
  isModalOpen: boolean;
  closeModal: () => void;
}
