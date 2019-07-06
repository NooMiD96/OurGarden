import React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import GenerateLink from "@src/core/components/GenerateLink";

import { IApplicationState } from "@src/Store";
import Tabs from "@core/antd/Tabs";

import NavMenuWrapper from "./style/navmenu.style";

const NavMenu = (props: RouterState) => {
  let defaultActiveKey = "Главная";

  const tabList = [
    { key: "Главная", title: "Главная", link: "Главная" },
    { key: "Каталог", title: "Каталог", link: "Каталог" },
    { key: "Акции", title: "Акции", link: "Акции" },
    { key: "Доставка и оплата", title: "Доставка и оплата", link: "Доставка и оплата" },
    { key: "Ландшафтный дизайн", title: "Ландшафтный дизайн", link: "Ландшафтный дизайн" },
    { key: "Видеогалерея", title: "Видеогалерея", link: "Видеогалерея" },
    { key: "Контакты", title: "Контакты", link: "Контакты" },
  ];

  if (props.location && props.location.pathname) {

    const routeSplit = props.location.pathname.split("/");
    if (routeSplit.length > 1) {
      const mainRoute = routeSplit[1].toLowerCase();

      for (let i = 0; i < tabList.length; i++) {
        const tab = tabList[i];
        if (tab.link.replace(" ", "-").toLowerCase() === mainRoute) {
          defaultActiveKey = tab.key;
          break;
        }
      }
    }
  }

  return (
    <NavMenuWrapper>
      <Tabs className="navigation" tabPosition="top" defaultActiveKey={defaultActiveKey}>
        {
          tabList.map((x) => <Tabs.TabPane key={x.key} tab={<GenerateLink {...x} />} />)
        }
      </Tabs>
    </NavMenuWrapper>
  );
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(NavMenu);
