import * as React from "react";

import AntdSider, { CollapseType } from "@core/antd/LayoutSider";
import { Text } from "@src/core/antd/Typography";
import CategoryList from "./CategoryList";

import { MobileContext } from "@src/core/constants";

import { TState, TComponentState } from "../TState";

export class Sider extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState, context: typeof MobileContext) {
    super(props, context);

    if (!props.isDataWasGeted && !props.categoryList.length) {
      this.props.getCategoryList();
    }
  }

  state: TComponentState = {
    isCollapsed: this.context,
    isCollapsible: this.context,
  };

  onCollapse = (isCollapsed: boolean, _: CollapseType) => {
    this.setState({
      isCollapsed,
    });
  };

  onSiderBreakpoint = (isCollapsible: boolean) => {
    this.setState({
      isCollapsible,
    });
  };

  setCollapse = (isCollapsed: boolean) => {
    this.setState({
      isCollapsed,
    });
  };

  render() {
    const { location, categoryList } = this.props;
    const { isCollapsed, isCollapsible } = this.state;

    return (
      <AntdSider
        breakpoint="md"
        collapsedWidth="0"
        width={250}
        defaultCollapsed={this.context}
        collapsed={isCollapsible && isCollapsed}
        onBreakpoint={this.onSiderBreakpoint}
        onCollapse={this.onCollapse}
      >
        <div className="sider-catalog-header">
          <Text>Каталог</Text>
        </div>
        <CategoryList
          categoryList={categoryList}
          location={location}
          setCollapse={isCollapsible && this.setCollapse}
        />
      </AntdSider>
    );
  }
}

Sider.contextType = MobileContext;
