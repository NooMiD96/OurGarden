import { NavigateFunction } from "react-router-dom";

import { actionCreators as userCardActions } from "@components/UserCard/actions";
import { actionCreators as modalWindowsActions } from "@components/ModalWindow/actions";
import { IProduct } from "../State";

export interface IProductContentProps {
  addProductToCard: typeof userCardActions.addProductToCard;
  product: IProduct;
  ymId: number;
  showPhotoModalWindow: typeof modalWindowsActions.showPhotoModalWindow;
  showFeedbackModalWindow: typeof modalWindowsActions.showFeedbackModalWindow;
  navigate: NavigateFunction;
}

export interface IProductContentState {
  itemCount: string;
  showTitleBeforeProductPhoto: boolean;
  showTitleAfterProductPhoto: boolean;
  productImageClass: string;
}
