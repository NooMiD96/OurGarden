import React from "react";
import { Route } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

export const AppRoutes = (
  <Layout>
    <Route
      exact
      path="/"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "Home" */ "@components/Home")
      )}
    />
    <Route
      exact
      path="/категории"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "Category" */ "@components/Category")
      )}
    />
    <Route
      exact
      path="/подкатегории"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "Subcategory" */ "@components/Subcategory")
      )}
    />
    <Route
      exact
      path="/товары"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "Product" */ "@components/Product")
      )}
    />
  </Layout>
);
