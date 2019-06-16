import { RouterState } from "connected-react-router";

import { IAccountState } from "@src/components/Account/State";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

export interface IApplicationState {
  router: RouterState;

  account: IAccountState;
}

export const reducers = {
  account: AccountReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
