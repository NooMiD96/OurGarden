import * as React from "react";

import AntdSider from "@core/antd/LayoutSider";
import CategoryList from "./CategoryList";
import { Title } from "@src/core/antd/Typography";

import { TState, TComponentState } from "../TState";

export class Sider extends React.PureComponent<TState, TComponentState> {
  constructor(props: TState) {
    super(props);

    // SSR
    if (!props.categoryList.length) {
      this.props.getCategoryList();
    }
  }

  render() {
    const {
      location,
      categoryList,
      errorInner,
      cleanErrorInner,
      pending
    } = this.props;

    return (
      <AntdSider width={250}>
        <div className="sider-catalog-header">
          <Title>Каталог</Title>
        </div>
        <CategoryList categoryList={categoryList} location={location} />
      </AntdSider>
    );
  }
}
