import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import GenerateLink from "@core/components/GenerateLink";
import Tabs, { Tab } from "@core/materialUI/tabs";

import { getActiveRoute } from "@src/core/helpers/route/getActiveRoute";

import { IApplicationState } from "@src/Store";

const tabList = [
  { title: "Главная", link: "Home" },
  { title: "Каталог", link: "Catalog" },
  { title: "Акции", link: "News" },
  { title: "Доставка и оплата", link: "Payment" },
  { title: "Ландшафтный дизайн", link: "Design" },
  { title: "Видеогалерея", link: "Videogalery" },
  { title: "Контакты", link: "About" }
];

const NavMenu = (props: RouterState) => {
  const [tab, setTab] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const activeKey = getActiveRoute(tabList, props.location);
    const index = tabList.findIndex((x) => x.link === activeKey);
    setTab(index || 0);
  }, [props.location]);

  return (
    <React.Fragment>
      <Tabs
        value={tab}
        onChange={handleChange}
        className="navigation"
        variant="scrollable"
        scrollButtons="auto"
        classes={{ indicator: "d-none" }}
      >
        {tabList.map((x) => (
          <Tab
            key={x.link}
            label={<GenerateLink {...x} />}
            disableFocusRipple
            disableRipple
          />
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
