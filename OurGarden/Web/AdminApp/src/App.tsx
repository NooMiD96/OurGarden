import React from "react";
import { Navigate, Route, Routes, redirect } from "react-router-dom";

import { Layout } from "@components/Layout";
import { AsyncComponent } from "@core/HOC/AsyncComponent";

/* prettier-ignore */
export const AppRoutes = (
  <Layout>
    <Routes>
      <Route
        path="/"
        element={
          <AsyncComponent key="Home" componentLoader={() => import(/* webpackChunkName: "Home" */ "@components/Home")} />
        }
      />
      <Route
        path="/news"
        element={
          <AsyncComponent key="News" componentLoader={() => import(/* webpackChunkName: "News" */ "@components/News")} />
        }
      />
      <Route
        path="/categories"
        element={
          <AsyncComponent key="Category" componentLoader={() => import(/* webpackChunkName: "Category" */ "@components/Category")} />
        }
      />
      <Route
        path="/subcategories"
        element={
          <AsyncComponent key="Subcategory" componentLoader={() => import(/* webpackChunkName: "Subcategory" */ "@components/Subcategory")} />
        }
      />

      <Route
        path="/products"
        element={
          <AsyncComponent key="Product" componentLoader={() => import(/* webpackChunkName: "Product" */ "@components/Product")} />
        }
      />

      <Route
        path="/orders"
        element={
          <AsyncComponent key="Order" componentLoader={() => import(/* webpackChunkName: "Order" */ "@components/Order")} />
        }
      />
      <Route
        path="/clients"
        element={
          <AsyncComponent key="Clients" componentLoader={() => import(/* webpackChunkName: "Clients" */ "@components/Clients")} />
        }
      />
      <Route
        path="/gallery"
        element={
          <AsyncComponent key="Gallery" componentLoader={() => import(/* webpackChunkName: "Gallery" */ "@components/Gallery")} />
        }
      />
      <Route
        path="/pages"
        element={
          <AsyncComponent key="PageInfo" componentLoader={() => import(/* webpackChunkName: "PageInfo" */ "@components/PageInfo")} />
        }
      />
    </Routes>
  </Layout>
);
