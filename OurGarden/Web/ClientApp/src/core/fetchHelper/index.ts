import { ResponseError } from "@core/declarations/ResponseError";
import { errorCreater } from "./ErrorCreater";

// prettier-ignore
export const uncatchedError
  = "Упс... Что-то пошло не так... Пожалуйста, повторите попытку";
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
      return errorCreater({
        message: `${uncatchedError}. Статус ошибки ${res.status}.`,
      });
  }
};

export const errorCatcher = (
  componentName: string,
  methodName = "",
  error: ResponseError,
  action?: (errorData: string) => void,
  dispatch?: (actionFunc: any) => void,
  dataAction?: (data: any) => void
) => {
  // prettier-ignore
  console.warn(
    `Catch the error at ${
      componentName
    }.\nCall ${
      methodName
    } method.\n${
      error?.stack ? `STACK: ${error.stack}` : `MESSAGE: ${error.message}`
    }`
  );

  if (dispatch) {
    if (action) {
      dispatch(action(error.message));
    }

    if (dataAction && error.data) {
      dispatch(dataAction(error.data));
    }
  }
};
