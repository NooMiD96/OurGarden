import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { Layout } from "@components/Layout";
import PageNotFound from "@core/components/PageNotFound";

import { AsyncComponent } from "@core/HOC/AsyncComponent";

export const AppRoutes = (
  <Layout>
    <Switch>
      <Redirect exact from="/Home" to="/" />
      <Route
        exact
        path="/"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Home" */ "@components/Home"),
          ["@components/Home"],
          () => [require.resolveWeak("@components/Home")]
        )}
      />

      <Route
        path="/Catalog/:categoryId/:subcategoryId/:productId"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Product" */ "@components/Product"),
          ["@components/Product"],
          () => [require.resolveWeak("@components/Product")]
        )}
      />

      <Route
        path="/Catalog/:categoryId/:subcategoryId"
        // prettier-ignore
        component={AsyncComponent(
          () => import(
            /* webpackChunkName: "ProductList" */ "@components/ProductList"
          ),
          ["@components/ProductList"],
          () => [require.resolveWeak("@components/ProductList")]
        )}
      />
      <Route
        path="/Catalog/:categoryId"
        // prettier-ignore
        component={AsyncComponent(
          () => import(
            /* webpackChunkName: "Subcategory" */ "@components/Subcategory"
          ),
          ["@components/Subcategory"],
          () => [require.resolveWeak("@components/Subcategory")]
        )}
      />

      <Route
        path="/Catalog"
        // prettier-ignore
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Category" */ "@components/Category"),
          ["@components/Category"],
          () => [require.resolveWeak("@components/Category")]
        )}
      />

      <Route
        path="/Card"
        // prettier-ignore
        component={AsyncComponent(
          () => import(/* webpackChunkName: "UserCard" */ "@components/UserCard"),
          ["@components/UserCard"],
          () => [require.resolveWeak("@components/UserCard")]
        )}
      />

      <Route
        path="/News/:newsId"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "News" */ "@components/News"),
          ["@components/News"],
          () => [require.resolveWeak("@components/News")]
        )}
      />

      <Route
        path="/News"
        // prettier-ignore
        component={AsyncComponent(
          () => import(/* webpackChunkName: "NewsList" */ "@components/NewsList"),
          ["@components/NewsList"],
          () => [require.resolveWeak("@components/NewsList")]
        )}
      />

      <Route
        path="/Payment"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Payment" */ "@components/Payment"),
          ["@components/Payment"],
          () => [require.resolveWeak("@components/Payment")]
        )}
      />

      <Route
        path="/Design"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Design" */ "@components/Design"),
          ["@components/Design"],
          () => [require.resolveWeak("@components/Design")]
        )}
      />

      <Route
        path="/rulonnyj-gazon"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Gazon" */ "@components/Gazon"),
          ["@components/Gazon"],
          () => [require.resolveWeak("@components/Gazon")]
        )}
      />

      <Route
        path="/Videogalery"
        // prettier-ignore
        component={AsyncComponent(
          () => import(
          /* webpackChunkName: "Videogalery" */ "@components/Videogalery"
          ),
          ["@components/Videogalery"],
          () => [require.resolveWeak("@components/Videogalery")]
        )}
      />

      <Route
        path="/About"
        // prettier-ignore
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Contacts" */ "@components/Contacts"),
          ["@components/Contacts"],
          () => [require.resolveWeak("@components/Contacts")]
        )}
      />

      <Route component={PageNotFound} />
    </Switch>
  </Layout>
);
