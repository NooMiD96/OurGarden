// -----------------
// STATE
import { XPT } from "@core/helpers/auth/xsrf";

export interface IAccountState {
  isUserAuth: boolean;
  pending: boolean;
  errorMessage?: string;
  _xpt: XPT | null;
}

export const unloadedState: IAccountState = {
  isUserAuth: false,
  pending: false,
  _xpt: null,
};
