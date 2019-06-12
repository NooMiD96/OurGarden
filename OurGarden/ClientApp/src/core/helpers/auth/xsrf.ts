import { IResponse } from "@core/fetchHelper/IResponse";
import { ApplicationState } from "@src/Store";

export interface XPT {
  __xpt_cookie: string;
  __xpt_request: string;
  __xpt_header_name: string;
}

/**
 * This function return Promise without(!) catcher
 * @param userModel Model which was auth
 */
export const GetXsrf: <TUserModel>(userModel: TUserModel) => Promise<false | XPT | undefined> = userModel => fetch("/api/account/renewxsrf", {
  method: "POST",
  credentials: "same-origin",
  headers: { "Content-Type": "application/json; charset=UTF-8" },
  body: JSON.stringify(userModel),
}).then((response: Response) => {
  if (response.status !== 200) { throw new Error(response.statusText); }
  return response.json();
}).then((result: IResponse<string>) => {
  if (result.error) {
    throw new Error(result.error);
  }
  return JSON.parse(result.data) as XPT;
});

export const GetXsrfToHeader: (getState: () => ApplicationState) => object = getState => {
  const { _xpt } = getState().account;

  return _xpt
    ? { [_xpt.__xpt_header_name]: _xpt.__xpt_request }
    : {};
};
