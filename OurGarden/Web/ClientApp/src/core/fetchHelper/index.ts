import { errorCreater } from "./ErrorCreater";

/// prettier-ignore
export const uncatchError = "Упс... Что-то пошло не так... Пожалуйста, повторите попытку";
export const responseCatcher = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  switch (res.status) {
    case 400:
      // eslint-disable-next-line no-return-await
      return await errorCreater.createValidationError(res);

    case 401:
      return errorCreater.createAuthError();

    default:
      return errorCreater(`${uncatchError}. Статус ошибки ${res.status}.`);
  }
};

export const errorCatcher = (
  componentName: string,
  methodName = "",
  error: Error,
  action?: (errorData: string) => void,
  dispatch?: (actionFunc: any) => void
) => {
  console.warn(
    `Catch the error at ${componentName}.\r\nCall ${methodName} method.${
      error.stack ? `\r\n${error.stack}` : ` ${error.message}`
    }`
  );

  if (action && dispatch) {
    dispatch(action(error.message));
  }
};
