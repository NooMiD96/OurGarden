import { FormComponentProps, WrappedFormUtils } from "@core/antd/Form";
import { DisplayTypeEnum } from "../../TState";
import { IOrderUserInformation } from "../../IModel";
import { IUserCardProduct } from "../../State";

export interface ICardConfirmationForm extends FormComponentProps {
  totalPrice: number;
  submit: (payload: IOrderUserInformation) => void;
  cancel: () => void;
  ymId: number;
}

export interface ICardConfirmationFormFields {
  form: WrappedFormUtils;
  onSubmit: () => void;
}

export interface ICardConfirmation {
  productList: IUserCardProduct[];
  sendOrder: (userInfo: IOrderUserInformation) => void;
  onChangeOrderStep: (payload: DisplayTypeEnum) => void;
  ymId: number;
}
