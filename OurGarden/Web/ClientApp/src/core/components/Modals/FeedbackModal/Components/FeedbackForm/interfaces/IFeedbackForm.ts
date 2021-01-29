import { FormInstance } from "@core/antd/Form";

export interface IFeedbackForm {
  form: FormInstance;
  onSubmit: () => void;
  messageDefaultValue?: string;
}
