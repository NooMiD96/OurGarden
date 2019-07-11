import { RouterState } from "connected-react-router";

import { IHomeState } from "@components/Home/State";
import { reducer as HomeReducer } from "@components/Home/reducer";

import { ISiderState } from "@components/Main/Sider/State";
import { reducer as SiderReducer } from "@components/Main/Sider/reducer";

export interface IApplicationState {
  router: RouterState;

  home: IHomeState;
  sider: ISiderState;
}

export const reducers = {
  home: HomeReducer,
  sider: SiderReducer,
};

export interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
