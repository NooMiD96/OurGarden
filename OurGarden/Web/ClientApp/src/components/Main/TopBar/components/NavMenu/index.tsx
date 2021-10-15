/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { connect } from "react-redux";
import { RouterState } from "connected-react-router";
import { Location } from "history";

import GenerateLink from "@core/components/GenerateLink";

import { getActiveRoute } from "@core/helpers/route/getActiveRoute";
import { IMPORT_DELAY } from "@src/core/constants";

import { IApplicationState } from "@src/Store";

const tabList = [
  { title: "Главная", link: "" },
  { title: "Каталог", link: "Catalog" },
  { title: "Акции", link: "News" },
  { title: "Доставка и оплата", link: "Payment" },
  { title: "Ландшафтный дизайн", link: "Design" },
  { title: "Контакты", link: "Contacts" },
  { title: "О нас", link: "About" },
];

export class NavMenu extends React.PureComponent<
  RouterState,
  {
    tabIndex: number | false;
    TabsComponent: any;
  }
> {
  constructor(props: RouterState) {
    super(props);

    this.state = {
      tabIndex: this.getActiveTabIndex(props.location),
      TabsComponent: undefined,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      import(/* webpackChunkName: "Tabs" */ "@core/materialUI/tabs").then(
        (tabsComponent) => {
          this.setState({
            TabsComponent: tabsComponent,
          });
        }
      );
    }, IMPORT_DELAY);
  }

  componentDidUpdate(prevProps: RouterState) {
    if (prevProps.location !== this.props.location) {
      // eslint-disable-next-line react/no-did-update-set-state
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
    const { tabIndex, TabsComponent } = this.state;

    if (TabsComponent) {
      return (
        <React.Fragment>
          <TabsComponent.default
            value={tabIndex}
            onChange={this.handleChange}
            className="navigation"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ indicator: "d-none" }}
          >
            {tabList.map((x) => (
              <TabsComponent.Tab
                key={x.link || "Home"}
                label={<GenerateLink {...x} />}
                disableFocusRipple
                disableRipple
              />
            ))}
          </TabsComponent.default>
        </React.Fragment>
      );
    }

    return (
      <div className="navigation temporary-tabs-container">
        {tabList.map((x) => (
          <GenerateLink key={x.link || "Home"} {...x} />
        ))}
      </div>
    );
  }
}

export default connect(
  (state: IApplicationState): RouterState => ({
    ...state.router,
  })
)(NavMenu);
