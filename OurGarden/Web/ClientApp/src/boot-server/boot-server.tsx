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
import { getFileStat, getParamsData } from "./utils";
import { MobileContext } from "@src/core/constants";

import "@src/assets/css/main.css";
import "@src/assets/scss/main.scss";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getBundles } = require("react-loadable-ssr-addon");

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
  const modules: string[] = [];
  const routerContext: any = {};
  const app = (
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
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
    </Loadable.Capture>
  );

  // This kick off any async tasks started by React components
  renderToString(app);

  // If there's a redirection, just send this information back to the host application
  if (routerContext.url) {
    resolve({ redirectUrl: routerContext.url });
    return;
  }

  const stats = await getFileStat();
  const modulesToBeLoaded = [...stats.entrypoints, ...Array.from(modules)];
  const bundles = getBundles(stats, modulesToBeLoaded);

  const styles = bundles.css || [];
  const scripts = bundles.js || [];

  await Loadable.preloadAll();

  const stylesString = styles
    .map(
      (style: any) => `<link href="${style.publicPath}" rel="stylesheet"/>`
    )
    .join("\n");

  const scriptString = scripts
    .map(
      (bundle: any) => `<script src="${bundle.publicPath}"></script>`
    )
    .join("\n");

  // Once any async tasks are done, we can perform the final render
  // We also send the redux store state, so the client can continue execution where the server left off
  params.domainTasks.then(() => {
    const stringApp = renderToString(app);
    const initialReduxState = store.getState();

    resolve({
      html: `<div class="styles">${
        stylesString
      }</div><div id="react-content">${
        stringApp
      }</div><div class="scriptes">${
        scriptString
      }</div>`,
      globals: {
        initialReduxState,
        __isMobileBrowser: isMobileBrowser
      }
    });
  }, reject); // Also propagate any errors back into the host application
});

export default createServerRenderer(preloader);
