import { actionCreators as userCardActions } from "@components/UserCard/actions";
import { IProduct } from "../State";

export interface IProductContentProps {
  addProductToCard: typeof userCardActions.addProductToCard;
  product: IProduct;
  ymId: number;
}

export interface IProductContentState {
  itemCount: string;
}
