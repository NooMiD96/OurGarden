import * as React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { createMemoryHistory } from "history";
import {
  createServerRenderer,
  RenderResult,
  BootFunc,
  BootFuncParams
} from "aspnet-prerendering";

import Loadable from "react-loadable";

import { AppRoutes } from "@src/App";

import configureStore from "./ConfigureStore";
import { getParamsData } from "./utils";
import { MobileContext } from "@src/core/constants";

// prettier-ignore
// eslint-disable-next-line no-async-promise-executor
const preloader: BootFunc = (params: BootFuncParams) => new Promise<RenderResult>(async (resolve, reject) => {
  // Prepare Redux store with in-memory history, and dispatch a navigation event
  const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
  const urlAfterBasename = params.url.substring(basename.length);
  const history = createMemoryHistory();
  // check access to the requested url and change history entries
  history.replace(urlAfterBasename);
  // create a store and dispatch the user information
  const store = configureStore(history);

  let isMobileBrowser = getParamsData(params, "isMobileBrowser");
  isMobileBrowser = isMobileBrowser === null ? true : isMobileBrowser;

  // Prepare an instance of the application and perform an inital render that will
  // cause any async tasks (e.g., data access) to begin
  const routerContext: any = {};
  const app = (
    <MobileContext.Provider value={isMobileBrowser}>
      <Provider store={store}>
        <StaticRouter
          basename={basename}
          context={routerContext}
          location={params.location.path}
        >
          {AppRoutes}
        </StaticRouter>
      </Provider>
    </MobileContext.Provider>
  );

  // This kick off any async tasks started by React components
  renderToString(app);

  // If there's a redirection, just send this information back to the host application
  if (routerContext.url) {
    resolve({ redirectUrl: routerContext.url });
    return;
  }

  await Loadable.preloadAll();

  // Once any async tasks are done, we can perform the final render
  // We also send the redux store state, so the client can continue execution where the server left off
  params.domainTasks.then(() => {
    const stringApp = renderToString(app);
    const initialReduxState = store.getState();

    // If there's a redirection, just send this information back to the host application
    if (routerContext.url) {
      resolve({ redirectUrl: routerContext.url });
      return;
    }

    resolve({
      html: stringApp,
      globals: {
        initialReduxState,
        __isMobileBrowser: isMobileBrowser
      }
    });
  }, reject); // Also propagate any errors back into the host application
});

export default createServerRenderer(preloader);
