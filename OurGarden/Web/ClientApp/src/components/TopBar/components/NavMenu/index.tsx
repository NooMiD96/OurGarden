import * as React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import { Link } from "react-router-dom";

import { IApplicationState } from "@src/Store";
import Tabs from "@core/antd/Tabs";

import NavMenuWrapper from "./style/navmenu.style";

export class NavMenu extends React.Component<RouterState, {}> {
  generateLink = (title: string, link?: string) => (
    <Link
      to={(
        link === undefined
          ? title
          : link
      )}
      className="nav-link"
    >
      {title}
    </Link>
  )

  render() {
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
            tabList.map(x => (
              <Tabs.TabPane key={x.key} tab={this.generateLink(x.title, x.link)} />    
            ))
          }
          <Tabs.TabPane key="1Главная" tab={this.generateLink("1Главная", "")} />
          <Tabs.TabPane key="1Каталог" tab={this.generateLink("1Каталог")} />
          <Tabs.TabPane key="1Акции" tab={this.generateLink("1Акции")} />
          <Tabs.TabPane key="1Доставка и оплата" tab={this.generateLink("1Доставка и оплата")} />
          <Tabs.TabPane key="1Ландшафтный дизайн" tab={this.generateLink("1Ландшафтный дизайн")} />
          <Tabs.TabPane key="1Видеогалерея" tab={this.generateLink("1Видеогалерея")} />
          <Tabs.TabPane key="1Контакты" tab={this.generateLink("1Контакты")} />
        </Tabs>
      </NavMenuWrapper>
    );
  }
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(NavMenu);
