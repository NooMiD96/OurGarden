import * as React from "react";

import AntdSider from "@core/antd/LayoutSider";
import { Title } from "@src/core/antd/Typography";
import CategoryList from "./CategoryList";

import { TState, TComponentState } from "../TState";

export class Sider extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    if (!props.categoryList.length) {
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
        defaultCollapsed
      >
        <div className="sider-catalog-header">
          <Title level={4}>Каталог</Title>
        </div>
        <CategoryList categoryList={categoryList} location={location} />
      </AntdSider>
    );
  }
}
