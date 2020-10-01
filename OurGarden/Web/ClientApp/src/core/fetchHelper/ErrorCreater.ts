import { ResponseError } from "../declarations/ResponseError";
import { IJsonValidationError, IResponse } from "./IResponse";

// prettier-ignore
export const errorCreater = ({
  message,
  data
}: {
  message?: string,
  data?: any,
}) => Promise.reject(new ResponseError({ message, data }));

errorCreater.createValidationError = async (res: Response) => {
  const error: IJsonValidationError & IResponse<unknown> = await res.json();

  if (error.error) {
    return errorCreater({ message: error.error, data: error.data });
  }

  return errorCreater({
    message: `Ошибка формата данных. Проверьте что все обязательные поля заполнены. ${error.title}`,
  });
};

// prettier-ignore
errorCreater.createAuthError = () => errorCreater({ message: "Ошибка авторизации! Пожалуйста, зайдите заново." });
