import * as React from "react";

import AntdSider from "@core/antd/LayoutSider";
import CategoryList from "./CategoryList";

import { MobileContext } from "@src/core/constants";

import { TState, TComponentState } from "../TState";

export class Sider extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState, context: typeof MobileContext) {
    super(props, context);

    if (!props.isDataWasReceive && !props.categoryList.length) {
      this.props.getCategoryList();
    }
  }

  state: TComponentState = {
    isCollapsed: this.context,
    isCollapsible: this.context,
  };

  onCollapse = (isCollapsed: boolean) => {
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
    const { categoryList } = this.props;
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
          <span className="catalog-header">Каталог</span>
        </div>
        <CategoryList
          categoryList={categoryList}
          setCollapse={isCollapsible && this.setCollapse}
        />
      </AntdSider>
    );
  }
}

Sider.contextType = MobileContext;
