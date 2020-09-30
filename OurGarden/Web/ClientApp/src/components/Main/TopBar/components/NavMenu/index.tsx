import React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";
import { Location } from "history";

import GenerateLink from "@core/components/GenerateLink";
import Tabs, { Tab } from "@core/materialUI/tabs";

import { getActiveRoute } from "@core/helpers/route/getActiveRoute";

import { IApplicationState } from "@src/Store";

const tabList = [
  { title: "Главная", link: "" },
  { title: "Каталог", link: "Catalog" },
  { title: "Акции", link: "News" },
  { title: "Доставка и оплата", link: "Payment" },
  { title: "Ландшафтный дизайн", link: "Design" },
  { title: "Видеогалерея", link: "Videogalery" },
  { title: "Контакты", link: "About" },
];

export class NavMenu extends React.PureComponent<
  RouterState,
  { tabIndex: number | false }
> {
  constructor(props: RouterState) {
    super(props);

    this.state = {
      tabIndex: this.getActiveTabIndex(props.location),
    };
  }

  componentDidUpdate(prevProps: RouterState) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        tabIndex: this.getActiveTabIndex(this.props.location),
      });
    }
  }

  getActiveTabIndex = (location: Location<any>) => {
    const activeKey = getActiveRoute(tabList, location);
    let index = -1;
    if (activeKey || activeKey === "") {
      index = tabList.findIndex((x) => x.link === activeKey);
    }

    return typeof index === "number" && index !== -1 ? index : false;
  };

  handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    this.setState({
      tabIndex: newValue,
    });
  };

  render() {
    const { tabIndex } = this.state;

    return (
      <React.Fragment>
        <Tabs
          value={tabIndex}
          onChange={this.handleChange}
          className="navigation"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ indicator: "d-none" }}
        >
          {tabList.map((x) => (
            <Tab
              key={x.link || "Home"}
              label={<GenerateLink {...x} />}
              disableFocusRipple
              disableRipple
            />
          ))}
        </Tabs>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(NavMenu);
