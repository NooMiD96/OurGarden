import * as React from "react";

import AntdSider from "@core/antd/LayoutSider";
import Menu from "@core/antd/Menu";
import { Title } from "@src/core/antd/Typography";

import { TState, TComponentState } from "../TState";

const MoqMenuRender = () => (
  <Menu defaultSelectedKeys={["1"]} mode="inline">
    <Menu.Item key="1">
      <span>Option 1</span>
    </Menu.Item>
    <Menu.Item key="2">
      <span>Option 2</span>
    </Menu.Item>
    <Menu.Item key="3">
      <span>Option 3</span>
    </Menu.Item>
    <Menu.Item key="4">
      <span>Option 4</span>
    </Menu.Item>
    <Menu.Item key="5">
      <span>Option 5</span>
    </Menu.Item>
  </Menu>
)

export class Sider extends React.PureComponent<TState, TComponentState> {
  componentDidMount() {
    this.props.getCategoryList();
  }

  render() {
    const {
      categoryList,
      errorInner,
      cleanErrorInner,
      pending
    } = this.props;

    return (
      <AntdSider width={250}>
        <div className="sider-catalog-header">
          <Title>
            Каталог
          </Title>
        </div>
        <MoqMenuRender />
      </AntdSider>
    );
  }
}
