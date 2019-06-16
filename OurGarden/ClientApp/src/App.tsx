import * as React from "react";
import { Route } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

export const AppRoutes = (
  <Layout>
    <div>Hellow</div>
    {/* <Route exact path="/" component={AsyncComponent(() => import(\/* webpackChunkName: "Home" *\/ "@components/Home"))} /> */}
  </Layout>
);
