import * as React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import Menu from "@core/antd/Menu";
import Sider from "@core/antd/LayoutSider";

import { IApplicationState } from "@src/Store";
import GenerateLink from "@src/core/components/GenerateLink";
import { getActiveRoute } from "@src/core/helpers/route/getActiveRoute";

export const NavMenu = (props: RouterState) => {
  const navList = [
    {
      key: "Новости и акции",
      title: "Новости и акции",
      link: "Новости и акции"
    },
    { key: "Заказы", title: "Заказы", link: "Заказы" },
    { key: "Категории", title: "Категории", link: "Категории" },
    { key: "Подкатегории", title: "Подкатегории", link: "Подкатегории" },
    { key: "Товары", title: "Товары", link: "Товары" },
    { key: "Фотогалерея", title: "Фотогалерея", link: "Фотогалерея" },
    { key: "Видеогалерея", title: "Видеогалерея", link: "Видеогалерея" }
  ];

  const selectedKeys = getActiveRoute(navList, props.location);

  return (
    <Sider>
      <div
        className="logo"
        style={{
          height: "32px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px",
          textAlign: "center",
          paddingTop: "2px"
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "white"
          }}
        >
          Наш сад
        </span>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
        {navList.map(x => (
          <Menu.Item key={x.key}>
            <GenerateLink {...x} />
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router
  })
)(NavMenu);
