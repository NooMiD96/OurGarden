import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

export const AppRoutes = (
  <Layout>
    <Switch>
      <Redirect from="/главная" to="/" />
      <Route
        exact
        path="/"
        component={AsyncComponent(() =>
          import(/* webpackChunkName: "Home" */ "@components/Home")
        )}
      />
    </Switch>

    <Switch>
      <Route
        path="/каталог/:categoty/:subcategory/:product"
        component={AsyncComponent(() =>
          import(/* webpackChunkName: "Product" */ "@components/Product")
        )}
      />

      <Route
        path="/каталог/:categoty/:subcategory"
        component={AsyncComponent(() =>
          import(
            /* webpackChunkName: "ProductList" */ "@components/ProductList"
          )
        )}
      />
      <Route
        path="/каталог/:categoty?"
        component={AsyncComponent(() =>
          import(/* webpackChunkName: "Catalog" */ "@components/Catalog")
        )}
      />
    </Switch>

    <Route
      path="/Корзина"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "UserCard" */ "@components/UserCard")
      )}
    />
  </Layout>
);
