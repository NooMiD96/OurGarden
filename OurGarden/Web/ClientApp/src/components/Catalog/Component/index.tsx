import React from "react";

import Alert from "@core/components/Alert";

import { TState, TComponentState } from "@components/Catalog/TState";
import Layout from "@core/antd/Layout";
import Sider from "@core/antd/LayoutSider";
import Menu from "@core/antd/Menu";
import Icon from "@core/antd/Icon";
import Breadcrumb from "@core/components/Breadcrumb";

import HomeWrapper from "./style/Catalog.style";
import { Title } from "@src/core/antd/Typography";

const { Header, Content } = Layout;

const MoqMenuRender = () => (
  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    <Menu.Item key="1">
      <Icon type="idcard" />
      <span>Option 1</span>
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="idcard" />
      <span>Option 2</span>
    </Menu.Item>
    <Menu.SubMenu
      key="sub1"
      title={(
        <span>
          <Icon type="idcard" />
          <span>User</span>
        </span>
      )}
    >
      <Menu.Item key="3">Tom</Menu.Item>
      <Menu.Item key="4">Bill</Menu.Item>
      <Menu.Item key="5">Alex</Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu
      key="sub2"
      title={(
        <span>
          <Icon type="idcard" />
          <span>Team</span>
        </span>
      )}
    >
      <Menu.Item key="6">Team 1</Menu.Item>
      <Menu.Item key="8">Team 2</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item key="9">
      <Icon type="idcard" />
      <span>File</span>
    </Menu.Item>
  </Menu>
)

export class Catalog extends React.PureComponent<TState, TComponentState> {
  render() {
    const {
      errorInner,
      cleanErrorInner,
    } = this.props;

    return (
      <HomeWrapper>
        <Layout>
          <Sider>
            <div className="sider-catalog-header">
              <Title>
                Каталог
              </Title>
            </div>
            <MoqMenuRender />
          </Sider>
          <Layout>
            <Header>
              <Breadcrumb match={this.props.match} location={this.props.location}/>
            </Header>
            <Content>
              hellow Content
            </Content>
          </Layout>
        </Layout>
      </HomeWrapper>
    );
  }
}

export default Catalog;
