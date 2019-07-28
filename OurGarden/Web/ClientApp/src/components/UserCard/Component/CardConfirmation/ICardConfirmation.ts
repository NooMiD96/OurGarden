import { FormComponentProps, WrappedFormUtils } from "@core/antd/Form";
import { actionCreators } from "../../actions";
import { DisplayTypeEnum } from "../../TState";
import { IOrderUserInformation } from "../../IModel";
import { IUserCardProduct } from "../../State";

export interface ICardConfirmationForm extends FormComponentProps {
  totalPrice: number;
  submit: (payload: IOrderUserInformation) => void;
  cancel: () => void;
}

export interface ICardConfirmationFormFields {
  form: WrappedFormUtils;
  onSubmit: () => void;
}

export interface ICardConfirmation {
  productList: IUserCardProduct[];
  pending: boolean;
  sendOrder: typeof actionCreators.sendOrder;
  onChangeOrderStep: (payload: DisplayTypeEnum) => void;
}
