import { FormInstance } from "@core/antd/Form";
import { DisplayTypeEnum } from "../../TState";
import { IOrderUserInformation } from "../../IModel";
import { IUserCardProduct } from "../../State";

export interface ICardConfirmationForm {
  totalPrice: number;
  submit: (payload: IOrderUserInformation) => void;
  cancel: () => void;
  ymId: number;
}

export interface ICardConfirmationFormFields {
  form: FormInstance;
  onSubmit: () => void;
}

export interface ICardConfirmation {
  productList: IUserCardProduct[];
  sendOrder: (userInfo: IOrderUserInformation) => void;
  onChangeOrderStep: (payload: DisplayTypeEnum) => void;
  ymId: number;
}
