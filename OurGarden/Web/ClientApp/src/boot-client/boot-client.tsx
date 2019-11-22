import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { AppContainer } from "react-hot-loader";
import { createBrowserHistory } from "history";
import Loadable from "react-loadable";

import { IApplicationState } from "@src/Store";
import * as App from "@src/App";
import ConfigureStore from "./ConfigureStore";

import "@src/assets/css/main.css";
import "@src/assets/scss/main.scss";
import { MobileContext } from "@src/core/constants";

if (window !== null && window !== undefined) {
  window.onload = () => {
    let routes = App.AppRoutes;

    // Create browser history to use in the Redux store
    const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;
    const history = createBrowserHistory({ basename: baseUrl });

    // Get the application-wide store instance, prepopulating with state from the server where available.
    const initialState = (window as any).initialReduxState as IApplicationState;
    const store = ConfigureStore(history, initialState);

    function renderApp() {
      const isMobileBrowser = typeof __isMobileBrowser !== "boolean" ? true : __isMobileBrowser;
      // This code starts up the React app when it runs in a browser. It sets up the routing configuration
      // and injects the app into a DOM element.
      // `hydrate` needed to attach created by server render with DOM
      ReactDOM.hydrate(
        <AppContainer>
          <MobileContext.Provider value={isMobileBrowser}>
            <Provider store={store}>
              <ConnectedRouter history={history}>{routes}</ConnectedRouter>
            </Provider>
          </MobileContext.Provider>
        </AppContainer>,
        document.getElementById("react-content")
      );
    }

    Loadable.preloadReady().then(() => {
      renderApp();
    });

    // Allow Hot Module Replacement
    if (module.hot) {
      module.hot.accept("@src/App", () => {
      // eslint-disable-next-line global-require
        routes = require<typeof App>("@src/App").AppRoutes;
        renderApp();
      });
    }
  };
}
