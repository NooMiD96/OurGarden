import { IJsonValidationError } from "./IResponse";

export const errorCreater = (message: string) => (
  Promise.reject(new Error(message))
);

errorCreater.createValidationError = async (res: Response) => {
  const error: IJsonValidationError = await res.json();

  return errorCreater(`Ошибка формата данных. Проверьте что все обязательные поля заполнены. ${error.title}`);
};

errorCreater.createAuthError = () => errorCreater("Ошибка авторизации! Пожалуйста, зайдите заново.");
