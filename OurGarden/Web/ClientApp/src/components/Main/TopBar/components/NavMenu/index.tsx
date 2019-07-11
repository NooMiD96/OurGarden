import React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import GenerateLink from "@src/core/components/GenerateLink";
import Tabs from "@core/antd/Tabs";

import { getActiveRoute } from "@src/core/helpers/route/getActiveRoute";

import { IApplicationState } from "@src/Store";

const NavMenu = (props: RouterState) => {
  const tabList = [
    { key: "Главная", title: "Главная", link: "Главная" },
    { key: "Каталог", title: "Каталог", link: "Каталог" },
    { key: "Акции", title: "Акции", link: "Акции" },
    { key: "Доставка и оплата", title: "Доставка и оплата", link: "Доставка и оплата" },
    { key: "Ландшафтный дизайн", title: "Ландшафтный дизайн", link: "Ландшафтный дизайн" },
    { key: "Видеогалерея", title: "Видеогалерея", link: "Видеогалерея" },
    { key: "Контакты", title: "Контакты", link: "Контакты" },
  ];
  
  const activeKey = getActiveRoute(tabList, props.location);

  return (
    <>
      <Tabs className="navigation" activeKey={activeKey}>
        {
          tabList.map((x) => <Tabs.TabPane key={x.key} tab={<GenerateLink {...x} />} />)
        }
      </Tabs>
    </>
  );
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(NavMenu);