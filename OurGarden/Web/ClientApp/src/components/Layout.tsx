import * as React from 'react';

import AntdLayout from '@core/antd/Layout';

import ErrorHandler from '@core/HOC/ErrorHandler';
import NavMenu from './NavMenu';

import LayoutWrapper from "./Layout.style";

const { Header, Content, Footer } = AntdLayout;

export const Layout = ({
  children
}: {
  children?: React.ReactNode;
}) => (
  <ErrorHandler>
    <LayoutWrapper>
      <AntdLayout>
        <Header className="antd-header">
          <NavMenu />
        </Header>
        <Content className="main-content-wrapper">
          {children}
        </Content>
        <Footer className="footer">
          © 2019
        </Footer>
      </AntdLayout>
    </LayoutWrapper>
    <div id="global-modals-container" />
  </ErrorHandler>
)
