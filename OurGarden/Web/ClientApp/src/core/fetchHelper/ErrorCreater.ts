import { IJsonValidationError, IResponse } from "./IResponse";

// prettier-ignore
export const errorCreater = (message: string) => Promise.reject(new Error(message));

errorCreater.createValidationError = async (res: Response) => {
  const error: IJsonValidationError & IResponse<unknown> = await res.json();

  if (error.error) {
    return errorCreater(error.error);
  }

  return errorCreater(
    `Ошибка формата данных. Проверьте что все обязательные поля заполнены. ${error.title}`
  );
};

// prettier-ignore
errorCreater.createAuthError = () => errorCreater("Ошибка авторизации! Пожалуйста, зайдите заново.");
