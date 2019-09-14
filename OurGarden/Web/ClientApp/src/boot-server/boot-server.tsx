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
import { getBundles } from "react-loadable/webpack";

import { AppRoutes } from "@src/App";
import initReduxForComponent from "@core/BootServerHelper";

import path from "path";
import { readJson } from "fs-extra";

import configureStore from "./ConfigureStore";

import "@src/assets/css/main.css";
import "@src/assets/scss/main.scss";

const projectDir = process.cwd();
const fileStatPath = `${path.join(
  projectDir,
  "./wwwroot/client/client/react-loadable.json"
)}`;

const preloader: BootFunc = (params: BootFuncParams) =>
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
    const splitedUrl = urlAfterBasename
      .split("?")[0]
      .split("/")
      .filter(Boolean);
    initReduxForComponent(splitedUrl, store);
    // Prepare an instance of the application and perform an inital render that will
    // cause any async tasks (e.g., data access) to begin
    const modules: string[] = [];
    const context = {};
    const app = (
      <Provider store={store}>
        <StaticRouter
          basename={basename}
          context={context}
          location={params.location.path}
        >
          <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
            {AppRoutes}
          </Loadable.Capture>
        </StaticRouter>
      </Provider>
    );

    renderToString(app);

    const stats: any = await readJson(fileStatPath);
    const bundles = getBundles(stats, modules);

    const styles = bundles.filter((bundle) => bundle.file.endsWith(".css"));
    const scripts = bundles.filter((bundle) => bundle.file.endsWith(".js"));

    await Loadable.preloadAll();

    // This kick off any async tasks started by React components
    renderToString(app);

    // Once any async tasks are done, we can perform the final render
    // We also send the redux store state, so the client can continue execution where the server left off
    params.domainTasks.then(() => {
      resolve({
        html: `<div class="styles">${
          styles
            .map(
              (style) => `<link href="${(style as any).publicPath}" rel="stylesheet"/>`
            )
            .join("\n")
        }</div><div class="scriptes">${
          scripts
            .map(
              (bundle) => `<script src="${(bundle as any).publicPath}"></script>`
            )
            .join("\n")
        }</div><div id="react-content">${
          renderToString(app)
        }</div>
        `,
        globals: {
          initialReduxState: store.getState()
        }
      });
    }, reject); // Also propagate any errors back into the host application
  });

export default createServerRenderer(preloader);
