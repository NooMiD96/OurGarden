import { IUserCardProduct } from "../../State";
import { IProduct } from "@src/components/Product/State";
import { DisplayTypeEnum } from "../../TState";

export interface ICardInfo {
  productList: IUserCardProduct[];
  changeCountOfProduct: (payload: IUserCardProduct) => void;
  removeProductFromCard: (payload: IProduct) => void;
  cleanProductCard: () => void;
  onChangeOrderStep: (payload: DisplayTypeEnum) => void;
  ymId: number;
}

export interface ICardInfoFooter {
  isVisible: boolean;
  totalPrice: number;
  cleanProductCard: () => void;
  onChangeOrderStep: (payload: DisplayTypeEnum) => void;
  ymId: number;
}
