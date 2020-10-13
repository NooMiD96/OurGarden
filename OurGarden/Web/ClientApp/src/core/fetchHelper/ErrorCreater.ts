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
  try {
    // prettier-ignore
    const error: IJsonValidationError & IResponse<unknown>
      = await res.clone().json();

    if (error?.error) {
      return errorCreater({ message: error?.error, data: error?.data });
    }

    return errorCreater({
      message: `Ошибка формата данных. Проверьте что все обязательные поля заполнены. ${
        error?.title ?? ""
      }`,
    });
    // eslint-disable-next-line no-empty
  } catch {}
  const errorString = await res.text();
  return errorCreater({
    message: errorString,
  });
};

// prettier-ignore
errorCreater.createAuthError = () => errorCreater({ message: "Ошибка авторизации! Пожалуйста, зайдите заново." });
