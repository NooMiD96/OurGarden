import * as React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";

import { Title } from "@core/antd/Typography";
import Menu from "@core/antd/Menu";
import Icon from "@core/antd/Icon";

import { IApplicationState } from "@src/Store";

interface IComponentState {
  selectedKeys: string[];
}

export class NavMenu extends React.Component<RouterState, IComponentState> {
  state: IComponentState = {
    selectedKeys: [],
  };

  render() {
    const NavLinks = [];

    return (
      <div className="header-container">
        <div className="header-menu-container">
          <Menu
            theme="dark"
            mode="inline"
          >
            <Menu.SubMenu
              title={(
                <React.Fragment>
                  <Icon type="caret-dow" className="header-submenu-more-icon" />
                  <Title className="main-title" level={2}>
                    OurGarden
                  </Title>
                </React.Fragment>
              )}
            >
              {NavLinks}
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(NavMenu);
