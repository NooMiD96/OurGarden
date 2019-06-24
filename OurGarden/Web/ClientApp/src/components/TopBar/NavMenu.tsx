import * as React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import { Link } from "react-router-dom";

import { IApplicationState } from "@src/Store";
import Tabs from "@core/antd/Tabs";
// eslint-disable-next-line react/prefer-stateless-function
export class NavMenu extends React.Component<RouterState, {}> {
  generateLink = (title: string, link?: string) => (
    <Link
      to={link || title}
    >
      {title}
    </Link>
  )

  render() {
    return (
      <Tabs tabPosition="top">
        <Tabs.TabPane key="Главная" tab={this.generateLink("Главная", "")} />
        <Tabs.TabPane key="Каталог" tab={this.generateLink("Каталог")} />
        <Tabs.TabPane key="Акции" tab={this.generateLink("Акции")} />
        <Tabs.TabPane key="Доставка и оплата" tab={this.generateLink("Доставка и оплата")} />
        <Tabs.TabPane key="Ландшафтный дизайн" tab={this.generateLink("Ландшафтный дизайн")} />
        <Tabs.TabPane key="Видеогалерея" tab={this.generateLink("Видеогалерея")} />
        <Tabs.TabPane key="Контакты" tab={this.generateLink("Контакты")} />
      </Tabs>
    );
  }
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(NavMenu);
