import { actionCreators as userCardActions } from "@components/UserCard/actions";
import { actionCreators as modalWindowsActions } from "@components/ModalWindow/actions";
import { Push } from "connected-react-router";
import { IProduct } from "../State";

export interface IProductContentProps {
  addProductToCard: typeof userCardActions.addProductToCard;
  product: IProduct;
  ymId: number;
  push: Push;
  showPhotoModalWindow: typeof modalWindowsActions.showPhotoModalWindow;
  showFeedbackModalWindow: typeof modalWindowsActions.showFeedbackModalWindow;
}

export interface IProductContentState {
  itemCount: string;
  showTitleBeforeProductPhoto: boolean;
  showTitleAfterProductPhoto: boolean;
  productImageClass: string;
}
