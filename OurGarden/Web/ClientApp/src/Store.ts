import { RouterState } from "connected-react-router";

import { IHomeState } from "@src/components/Home/State";
import { reducer as HomeReducer } from "@src/components/Home/reducer";

export interface IApplicationState {
  router: RouterState;

  home: IHomeState;
}

export const reducers = {
  home: HomeReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
