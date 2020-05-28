import * as React from "react";

import AntdSider from "@core/antd/LayoutSider";
import { Text } from "@src/core/antd/Typography";
import CategoryList from "./CategoryList";

import { MobileContext } from "@src/core/constants";

import { TState, TComponentState } from "../TState";

export class Sider extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.isDataWasGeted && !props.categoryList.length) {
      this.props.getCategoryList();
    }
  }

  render() {
    const { location, categoryList } = this.props;

    return (
      <AntdSider
        breakpoint="md"
        collapsedWidth="0"
        width={250}
        defaultCollapsed={this.context}
      >
        <div className="sider-catalog-header">
          <Text>Каталог</Text>
        </div>
        <CategoryList categoryList={categoryList} location={location} />
      </AntdSider>
    );
  }
}

Sider.contextType = MobileContext;
