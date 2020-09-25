import { IFeedbackDTO } from "./interfaces/IFeedbackDTO";
import { fetch } from "domain-task";

export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const apiController = "Home";
export const sendFeedback = async (modelDTO: IFeedbackDTO) => {
  const result = await fetch(`/api/${apiController}/SendFeedback`, {
    credentials: "same-origin",
    method: "POST",
    body: JSON.stringify(modelDTO),
  }).then((res: Response) => res.json());

  return result;
};
