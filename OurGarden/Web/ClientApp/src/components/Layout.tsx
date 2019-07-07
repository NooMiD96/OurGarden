import * as React from 'react';

import AntdLayout from '@core/antd/Layout';
import ConfigProvider from "@core/antd/ConfigProvider";
import RenderEmptyProvider from '@core/components/RenderEmptyProvider';
// import Row from '@core/antd/Row';
// import Col from '@core/antd/Col';
import { Row, Col } from '@src/core/antd';

import ErrorHandler from '@core/HOC/ErrorHandler';

import TopBar from './TopBar';

import LayoutWrapper from "./Layout.style";

const { Header, Content, Footer } = AntdLayout;

const colStyle = {
  // xs	<576px
  xs: { offset: 0, span: 24 },
  // sm	≥576px
  sm: { offset: 0, span: 24 },
  // md	≥768px
  md: { offset: 1, span: 22 },
  // lg	≥992px
  lg: { offset: 2, span: 20 },
  // xl	≥1200px
  xl: { offset: 3, span: 18 },
  // xxl	≥1600px
  xxl: { offset: 4, span: 16 },
}

export const Layout = ({
  children
}: {
  children?: React.ReactNode;
}) => (
  <ErrorHandler>
    <LayoutWrapper className="layout-wrapper">
      <Row type="flex">
        <Col {...colStyle}>
          <AntdLayout>
            <Header className="antd-header">
              <TopBar />
            </Header>
            <Content className="main-content-wrapper">
              <ConfigProvider renderEmpty={RenderEmptyProvider}>
                {children}
              </ConfigProvider>
            </Content>
            <Footer className="footer">
              © 2019
            </Footer>
          </AntdLayout>
        </Col>
      </Row>
    </LayoutWrapper>
    <div id="global-modals-container" />
  </ErrorHandler>
)
