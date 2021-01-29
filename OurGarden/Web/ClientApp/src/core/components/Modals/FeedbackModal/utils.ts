import { IFeedbackDTO } from "./interfaces/IFeedbackDTO";
import { fetch } from "domain-task";

const apiController = "Home";
export const sendFeedback = async (modelDTO: IFeedbackDTO) => {
  const result: Promise<Response> = await fetch(
    `/api/${apiController}/SendFeedback`,
    {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(modelDTO),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );

  return result;
};
