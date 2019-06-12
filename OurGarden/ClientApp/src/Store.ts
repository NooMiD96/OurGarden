import { RouterState } from "connected-react-router";

import { AccountState } from "@src/components/Account/IAccountState";
import { reducer as AccountReducer } from "@src/components/Account/reducer";

export interface ApplicationState {
  router: RouterState;

  account: AccountState;
}

export const reducers = {
  account: AccountReducer,
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
