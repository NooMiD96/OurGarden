import * as React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import GenerateLink from "@src/core/components/GenerateLink";

import { IApplicationState } from "@src/Store";
import Tabs from "@core/antd/Tabs";

import NavMenuWrapper from "./style/navmenu.style";

const NavMenu = (_props: RouterState) => {
  const tabList = [
    { key: "Главная", title: "Главная", link: "Главная" },
    { key: "Каталог", title: "Каталог", link: "Каталог" },
    { key: "Акции", title: "Акции", link: "Акции" },
    { key: "Доставка и оплата", title: "Доставка и оплата", link: "Доставка и оплата" },
    { key: "Ландшафтный дизайн", title: "Ландшафтный дизайн", link: "Ландшафтный дизайн" },
    { key: "Видеогалерея", title: "Видеогалерея", link: "Видеогалерея" },
    { key: "Контакты", title: "Контакты", link: "Контакты" },
  ];

  return (
    <NavMenuWrapper>
      <Tabs className="navigation" tabPosition="top">
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
