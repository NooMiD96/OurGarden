import { IJsonValidationError, IResponse } from "./IResponse";

// prettier-ignore
export const errorCreater = (message: string) => Promise.reject(new Error(message));

errorCreater.createValidationError = async (res: Response) => {
  try {
    // prettier-ignore
    const error: IJsonValidationError & IResponse<unknown>
      = await res.clone().json();

    if (error?.error) {
      return errorCreater(error.error);
    }

    // prettier-ignore
    return errorCreater(
      `Ошибка формата данных. Проверьте что все обязательные поля заполнены. ${error?.title
        ?? ""}`
    );
    // eslint-disable-next-line no-empty
  } catch {}
  const errorString = await res.text();
  return errorCreater(errorString);
};

// prettier-ignore
errorCreater.createAuthError = () => errorCreater("Ошибка авторизации! Пожалуйста, перезайдите заново.");
