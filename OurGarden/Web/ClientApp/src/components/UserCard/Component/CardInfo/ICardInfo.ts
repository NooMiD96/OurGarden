import { IUserCardProduct } from "../../State";
import { IProduct } from "@src/components/Product/State";
import { DisplayTypeEnum } from "../../TState";

export type IDisplayInfo = {
  product: IProduct;
  productId: string;
  cost: number;
  count: number;
  totalCost: number;
}

export interface ICardInfo {
  productList: IUserCardProduct[];
  changeCountOfProduct: (payload: IUserCardProduct) => void;
  removeProductFromCard: (payload: IProduct) => void;
  сleanProductCard: () => void;
  onChangeOrderStep: (payload: DisplayTypeEnum) => void;
}

export interface ICardInfoTable {
  dataSource: IDisplayInfo[];
  changeCountOfProduct: (payload: IUserCardProduct) => void;
  removeProductFromCard: (payload: IProduct) => void;
}

export interface ICardInfoFooter {
  isVisible: boolean;
  totalPrice: number;
  сleanProductCard: () => void;
  onChangeOrderStep: (payload: DisplayTypeEnum) => void;
}
