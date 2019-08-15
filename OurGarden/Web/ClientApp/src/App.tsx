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
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Home" */ "@components/Home"),
          ["@components/Home"],
          [require.resolveWeak("@components/Home")]
        )}
      />
    </Switch>

    <Switch>
      <Route
        path="/каталог/:categoty/:subcategory/:product"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Product" */ "@components/Product"),
          ["@components/Product"],
          [require.resolveWeak("@components/Product")]
        )}
      />

      <Route
        path="/каталог/:categoty/:subcategory"
        component={AsyncComponent(
          () =>
            import(
              /* webpackChunkName: "ProductList" */ "@components/ProductList"
            ),
          ["@components/ProductList"],
          [require.resolveWeak("@components/ProductList")]
        )}
      />
      <Route
        path="/каталог/:categoty?"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "Catalog" */ "@components/Catalog"),
          ["@components/Catalog"],
          [require.resolveWeak("@components/Catalog")]
        )}
      />
    </Switch>

    <Route
      path="/Корзина"
      component={AsyncComponent(
        () => import(/* webpackChunkName: "UserCard" */ "@components/UserCard"),
        ["@components/UserCard"],
        [require.resolveWeak("@components/UserCard")]
      )}
    />

    <Switch>
      <Route
        path="/Акции/:newsId"
        component={AsyncComponent(
          () => import(/* webpackChunkName: "News" */ "@components/News"),
          ["@components/News"],
          [require.resolveWeak("@components/News")]
        )}
      />

      <Route
        path="/Акции"
        component={AsyncComponent(
          () =>
            import(/* webpackChunkName: "NewsList" */ "@components/NewsList"),
          ["@components/NewsList"],
          [require.resolveWeak("@components/NewsList")]
        )}
      />
    </Switch>

    <Route
      path="/Доставка-и-оплата"
      component={AsyncComponent(
        () => import(/* webpackChunkName: "Payment" */ "@components/Payment"),
        ["@components/Payment"],
        [require.resolveWeak("@components/Payment")]
      )}
    />

    <Route
      path="/Ландшафтный-дизайн"
      component={AsyncComponent(
        () => import(/* webpackChunkName: "Design" */ "@components/Design"),
        ["@components/Design"],
        [require.resolveWeak("@components/Design")]
      )}
    />

    <Route
      path="/Видеогалерея"
      component={AsyncComponent(
        () =>
          import(
            /* webpackChunkName: "Videogalery" */ "@components/Videogalery"
          ),
        ["@components/Videogalery"],
        [require.resolveWeak("@components/Videogalery")]
      )}
    />

    <Route
      path="/Контакты"
      component={AsyncComponent(
        () => import(/* webpackChunkName: "Contacts" */ "@components/Contacts"),
        ["@components/Contacts"],
        [require.resolveWeak("@components/Contacts")]
      )}
    />
  </Layout>
);
