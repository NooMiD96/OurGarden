import * as React from "react";

import Menu from "@core/antd/Menu";
import Sider from "@core/antd/LayoutSider";

import GenerateLink from "@src/core/components/GenerateLink";
import { getActiveRoute } from "@src/core/helpers/route/getActiveRoute";

import { useLocation } from "react-router-dom";

const navList = [
  { key: "Главная", title: "Главная", link: "" },
  { key: "Новости и акции", title: "Новости и акции", link: "news" },
  { key: "Категории", title: "Категории", link: "categories" },
  { key: "Подкатегории", title: "Подкатегории", link: "subcategories" },
  { key: "Товары", title: "Товары", link: "products" },
  { key: "Заказы", title: "Заказы", link: "orders" },
  { key: "Клиенты", title: "Клиенты", link: "clients" },
  { key: "Фотогалерея", title: "Фотогалерея", link: "gallery" },
  { key: "Страницы", title: "Страницы", link: "pages" },
];

export const NavMenu = () => {
  const location = useLocation();
  const selectedKeys = getActiveRoute(navList, location);

  return (
    <Sider>
      <div
        className="logo"
        style={{
          height: "32px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px",
          textAlign: "center",
          paddingTop: "2px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Наш Сад
        </span>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
        {navList.map((x) => (
          <Menu.Item key={x.key}>
            <GenerateLink {...x} />
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default NavMenu;
