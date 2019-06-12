import { createStore, applyMiddleware, combineReducers, ReducersMapObject, AnyAction } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";

import * as StoreModule from "@src/Store";
const { reducers } = StoreModule;
type ApplicationState = StoreModule.ApplicationState;

export default function configureStore(history: History) {
    const allReducers = buildRootReducer(history, reducers as any);
    const store = createStore(
        allReducers,
        applyMiddleware(thunk, routerMiddleware(history))
    );

    return store;
}

const buildRootReducer = (historyForRouterReducer: History, appReducers: ReducersMapObject<ApplicationState, AnyAction>) =>
    combineReducers<ApplicationState>({
        router: connectRouter(historyForRouterReducer),
        ...appReducers,
    });
