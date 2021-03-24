import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  ReducersMapObject,
  AnyAction,
} from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";

import * as StoreModule from "@src/Store";

const { reducers } = StoreModule;
type ApplicationState = StoreModule.IApplicationState;

// prettier-ignore
const buildRootReducer = (
  historyForRouterReducer: History,
  appReducers: ReducersMapObject<ApplicationState, AnyAction>
) => combineReducers<ApplicationState>({
  ...appReducers,
  router: connectRouter(historyForRouterReducer),
});

export default function configureStore(
  history: History,
  initialState: ApplicationState
) {
  let devToolsExtension;
  // prettier-ignore
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    // eslint-disable-next-line no-underscore-dangle
    devToolsExtension = window && (window.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer);
  }

  const store = createStore(
    buildRootReducer(history, reducers as any),
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      devToolsExtension
        ? devToolsExtension()
        : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )
  );

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept("@src/Store", () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
      const nextRootReducer = require<typeof StoreModule>("@src/Store");
      store.replaceReducer(
        buildRootReducer(history, nextRootReducer.reducers as any)
      );
    });
  }

  return store;
}
