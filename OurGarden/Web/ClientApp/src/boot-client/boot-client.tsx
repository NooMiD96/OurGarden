import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { AppContainer } from "react-hot-loader";
import { createBrowserHistory } from "history";

import { IApplicationState } from "@src/Store";
import * as App from "@src/App";
import ConfigureStore from "./ConfigureStore";

let routes = App.AppRoutes;

// import "@src/css/site.css";

// TODO: Register only in prod
//#region ServiceWorker
// import RegisterServiceWorker from "../registerServiceWorker";
// RegisterServiceWorker();
//#endregion

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as IApplicationState;
const store = ConfigureStore(history, initialState);

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing configuration
  // and injects the app into a DOM element.
  // `hydrate` needed to attach created by server render with DOM
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("react-app")
  );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept("@src/App", () => {
    // tslint:disable-next-line:no-require-imports
    routes = require<typeof App>("@src/App").AppRoutes;
    renderApp();
  });
}
