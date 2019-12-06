import * as React from "react";

import AntdLayout from "@core/antd/Layout";
import ConfigProvider from "@core/antd/ConfigProvider";
import RenderEmptyProvider from "@core/components/RenderEmptyProvider";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";

import AppHOC from "@core/HOC/AppHOC";
import ErrorHandler from "@core/HOC/ErrorHandler";
import TopBar from "@components/Main/TopBar";
import Sider from "@components/Main/Sider";
import Breadcrumb from "@components/Breadcrumb";

import { MAIN_LAYOUT_GRID_COL_STYLE } from "@core/constants";

const { Header, Content } = AntdLayout;

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <ErrorHandler>
    <Header className="antd-header">
      <Row type="flex">
        <Col {...MAIN_LAYOUT_GRID_COL_STYLE}>
          <TopBar />
        </Col>
      </Row>
    </Header>
    <AntdLayout className="antd-layout" hasSider>
      <Row type="flex">
        <Col {...MAIN_LAYOUT_GRID_COL_STYLE}>
          <Sider />
          <AntdLayout>
            <Content className="main-content-wrapper">
              <ConfigProvider renderEmpty={RenderEmptyProvider}>
                <AppHOC>
                  <Breadcrumb />
                  {children}
                </AppHOC>
              </ConfigProvider>
            </Content>
          </AntdLayout>
        </Col>
      </Row>
    </AntdLayout>
    <div id="global-modals-container" />
  </ErrorHandler>
);
