import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

/* prettier-ignore */
export const AppRoutes = (
  <Layout>
    <Route
      exact
      path="/"
      component={AsyncComponent(() => import(/* webpackChunkName: "Home" */ "@components/Home"))}
    />
    <Route
      exact
      path="/новости-и-акции"
      component={AsyncComponent(() => import(/* webpackChunkName: "Order" */ "@components/News"))}
    />
    <Route
      exact
      path="/категории"
      component={AsyncComponent(() => import(/* webpackChunkName: "Category" */ "@components/Category"))}
    />
    <Route
      exact
      path="/подкатегории"
      component={AsyncComponent(() => import(/* webpackChunkName: "Subcategory" */ "@components/Subcategory"))}
    />
    <Switch>
      <Redirect from="/продукты" to="/товары" />

      <Route
        exact
        path="/товары"
        component={AsyncComponent(() => import(/* webpackChunkName: "Product" */ "@components/Product"))}
      />
    </Switch>
    <Route
      exact
      path="/заказы"
      component={AsyncComponent(() => import(/* webpackChunkName: "Order" */ "@components/Order"))}
    />
    <Route
      exact
      path="/клиенты"
      component={AsyncComponent(() => import(/* webpackChunkName: "Clients" */ "@components/Clients"))}
    />
    <Route
      exact
      path="/фотогалерея"
      component={AsyncComponent(() => import(/* webpackChunkName: "Gallery" */ "@components/Gallery"))}
    />
    <Route
      exact
      path="/страницы"
      component={AsyncComponent(() => import(/* webpackChunkName: "PageInfo" */ "@components/PageInfo"))}
    />
  </Layout>
);
