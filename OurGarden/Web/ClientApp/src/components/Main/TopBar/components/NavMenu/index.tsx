import React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import GenerateLink from "@src/core/components/GenerateLink";
import Tabs from "@core/antd/Tabs";

import { getActiveRoute } from "@src/core/helpers/route/getActiveRoute";

import { IApplicationState } from "@src/Store";

const tabList = [
  { title: "Главная", link: "Home" },
  { title: "Каталог", link: "Catalog" },
  { title: "Акции", link: "News" },
  { title: "Доставка и оплата", link: "Payment"},
  { title: "Ландшафтный дизайн", link: "Design"},
  { title: "Видеогалерея", link: "Videogalery" },
  { title: "Контакты", link: "About" }
];

const NavMenu = (props: RouterState) => {
  const activeKey = getActiveRoute(tabList, props.location);

  return (
    <React.Fragment>
      <Tabs className="navigation" activeKey={activeKey}>
        {tabList.map(x => (
          <Tabs.TabPane key={x.link} tab={<GenerateLink {...x} />} />
        ))}
      </Tabs>
    </React.Fragment>
  );
};

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router
  })
)(NavMenu);
