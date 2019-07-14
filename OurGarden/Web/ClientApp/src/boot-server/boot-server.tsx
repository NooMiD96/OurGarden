import * as React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { createMemoryHistory } from "history";
import { createServerRenderer, RenderResult } from "aspnet-prerendering";

import { AppRoutes } from "@src/App";
import initReduxForComponent from "@core/BootServerHelper";

import configureStore from "./ConfigureStore";

import "@src/assets/css/main.css";
import "@src/assets/scss/main.scss";

export default createServerRenderer(params =>
  new Promise<RenderResult>(async (resolve, reject) => {
    // Prepare Redux store with in-memory history, and dispatch a navigation event
    const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
    const urlAfterBasename = params.url.substring(basename.length);
    const history = createMemoryHistory();
    // check access to the requested url and change history entries
    history.replace(urlAfterBasename);
    // create a store and dispatch the user information
    const store = configureStore(history);
    // init state corresponding to the incoming URL
    const splitedUrl = urlAfterBasename.split("?")[0].split("/").filter(Boolean);
    initReduxForComponent(splitedUrl, store);
    // Prepare an instance of the application and perform an inital render that will
    // cause any async tasks (e.g., data access) to begin
    const app = (
      <Provider store={store}>
        <StaticRouter
          basename={basename}
          context={{}}
          location={params.location.path}
        >
          {AppRoutes}
        </StaticRouter>
      </Provider>
    );

    // This kick off any async tasks started by React components
    renderToString(app);

    // Once any async tasks are done, we can perform the final render
    // We also send the redux store state, so the client can continue execution where the server left off
    params.domainTasks.then(() => {
      resolve({
        html: renderToString(app),
        globals: {
          initialReduxState: store.getState(),
          domainTasks:params
        },
      });
    }, reject); // Also propagate any errors back into the host application
  })
);
