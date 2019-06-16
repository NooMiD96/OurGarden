import { createStore, applyMiddleware, compose, combineReducers, StoreEnhancer, StoreEnhancerStoreCreator, ReducersMapObject, AnyAction } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";

import * as StoreModule from "@src/Store";

const { reducers } = StoreModule;
type ApplicationState = StoreModule.IApplicationState;


const buildRootReducer = (historyForRouterReducer: History, appReducers: ReducersMapObject<ApplicationState, AnyAction>) =>
  combineReducers<ApplicationState>({
    router: connectRouter(historyForRouterReducer),
    ...appReducers,
  });

export default function configureStore(history: History, initialState: ApplicationState) {
  let devToolsExtension;
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    devToolsExtension = window && (window as any).__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;
  }

  const store = createStore(
    buildRootReducer(history, reducers as any),
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )
  );

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept("@src/Store", () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nextRootReducer = require<typeof StoreModule>("@src/Store");
      store.replaceReducer(buildRootReducer(history, nextRootReducer.reducers as any));
    });
  }

  return store;
}
