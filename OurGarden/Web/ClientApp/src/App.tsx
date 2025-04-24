import React from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "@components/Layout";

import { AsyncComponent } from "@core/HOC/AsyncComponent";

export const AppRoutes = (
  <Layout>
    <Routes>
      <Route
        path="/"
        element={AsyncComponent(
          () => import(/* webpackChunkName: "Home" */ "@components/Home"),
          ["@components/Home"],
          () => [require.resolveWeak("@components/Home")]
        )}
      />

      <Route
        path="/Catalog/:categoryId/:subcategoryId/:productId"
        element={AsyncComponent(
          () => import(/* webpackChunkName: "Product" */ "@components/Product"),
          ["@components/Product"],
          () => [require.resolveWeak("@components/Product")]
        )}
      />

      <Route
        path="/Catalog/:categoryId/:subcategoryId"
        // prettier-ignore
        element={AsyncComponent(
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
        element={AsyncComponent(
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
        element={AsyncComponent(
          () => import(/* webpackChunkName: "Category" */ "@components/Category"),
          ["@components/Category"],
          () => [require.resolveWeak("@components/Category")]
        )}
      />

      <Route
        path="/Card"
        // prettier-ignore
        element={AsyncComponent(
          () => import(/* webpackChunkName: "UserCard" */ "@components/UserCard"),
          ["@components/UserCard"],
          () => [require.resolveWeak("@components/UserCard")]
        )}
      />

      <Route
        path="/News/:newsId"
        element={AsyncComponent(
          () => import(/* webpackChunkName: "News" */ "@components/News"),
          ["@components/News"],
          () => [require.resolveWeak("@components/News")]
        )}
      />

      <Route
        path="/News"
        // prettier-ignore
        element={AsyncComponent(
          () => import(/* webpackChunkName: "NewsList" */ "@components/NewsList"),
          ["@components/NewsList"],
          () => [require.resolveWeak("@components/NewsList")]
        )}
      />

      <Route
        path="/Payment"
        element={AsyncComponent(
          () => import(/* webpackChunkName: "Payment" */ "@components/Payment"),
          ["@components/Payment"],
          () => [require.resolveWeak("@components/Payment")]
        )}
      />

      <Route
        path="/Design"
        element={AsyncComponent(
          () => import(/* webpackChunkName: "Design" */ "@components/Design"),
          ["@components/Design"],
          () => [require.resolveWeak("@components/Design")]
        )}
      />

      <Route
        path="/rulonnyj-gazon"
        element={AsyncComponent(
          () => import(/* webpackChunkName: "Gazon" */ "@components/Gazon"),
          ["@components/Gazon"],
          () => [require.resolveWeak("@components/Gazon")]
        )}
      />

      <Route
        path="/Contacts"
        // prettier-ignore
        element={AsyncComponent(
          () => import(/* webpackChunkName: "Contacts" */ "@components/Contacts"),
          ["@components/Contacts"],
          () => [require.resolveWeak("@components/Contacts")]
        )}
      />

      <Route
        path="/About"
        // prettier-ignore
        element={AsyncComponent(
          () => import(/* webpackChunkName: "About" */ "@components/About"),
          ["@components/About"],
          () => [require.resolveWeak("@components/About")]
        )}
      />

      <Route
        // prettier-ignore
        element={AsyncComponent(
          () => import(
            /* webpackChunkName: "PageNotFound" */ "@core/components/PageNotFound"
          ),
          ["@core/components/PageNotFound"],
          () => [require.resolveWeak("@core/components/PageNotFound")]
        )}
      />
    </Routes>
  </Layout>
);
