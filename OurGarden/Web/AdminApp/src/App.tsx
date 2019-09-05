import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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
      path="/новости-и-акции"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "Order" */ "@components/News")
      )}
    />
    <Route
      exact
      path="/заказы"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "Order" */ "@components/Order")
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
      path="/фотогалерея"
      component={AsyncComponent(() =>
        import(/* webpackChunkName: "Gallery" */ "@components/Gallery")
      )}
    />
    <Route
      exact
      path="/видеогалерея"
      component={AsyncComponent(() =>
        import(
          /* webpackChunkName: "VideoGallery" */ "@components/VideoGallery"
        )
      )}
    />
    <Switch>
      <Redirect from="/продукты" to="/товары" />

      <Route
        exact
        path="/товары"
        component={AsyncComponent(() =>
          import(/* webpackChunkName: "Product" */ "@components/Product")
        )}
      />
    </Switch>
  </Layout>
);
