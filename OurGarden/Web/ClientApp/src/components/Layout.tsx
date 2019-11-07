import * as React from "react";

import AntdLayout from "@core/antd/Layout";
import ConfigProvider from "@core/antd/ConfigProvider";
import RenderEmptyProvider from "@core/components/RenderEmptyProvider";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";

import ErrorHandler from "@core/HOC/ErrorHandler";
import TopBar from "@components/Main/TopBar";
import Sider from "@components/Main/Sider";
import Breadcrumb from "@components/Breadcrumb";

const { Header, Content } = AntdLayout;

const colStyle = {
  // xs <576px
  xs: { offset: 0, span: 24 },
  // sm ≥576px
  sm: { offset: 0, span: 24 },
  // md ≥768px
  md: { offset: 1, span: 22 },
  // lg ≥992px
  lg: { offset: 2, span: 20 },
  // xl ≥1200px
  xl: { offset: 4, span: 16 },
  // xxl ≥1600px
  xxl: { offset: 5, span: 14 }
};

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <ErrorHandler>
    <Header className="antd-header">
      <Row type="flex">
        <Col {...colStyle}>
          <TopBar />
        </Col>
      </Row>
    </Header>
    <AntdLayout className="antd-layout" hasSider>
      <Row type="flex">
        <Col {...colStyle}>
          <Sider />
          <AntdLayout>
            <Content className="main-content-wrapper">
              <ConfigProvider renderEmpty={RenderEmptyProvider}>
                <Breadcrumb />
                {children}
              </ConfigProvider>
            </Content>
          </AntdLayout>
        </Col>
      </Row>
    </AntdLayout>
    <div id="global-modals-container" />
  </ErrorHandler>
);
