import * as React from 'react';

import AntdLayout from '@core/antd/Layout';
// import { Text, Paragraph } from "@core/antd/Typography";
// import { ConfigProvider, Empty } from "antd";

import AccountControlComponent from '@core/HOC/AccountControlComponent';
import ErrorHandler from '@core/HOC/ErrorHandler';
import NavMenu from './NavMenu';

const { Header, Content, Footer } = AntdLayout;
// const customizeRenderEmpty = () => (
//   <Empty
//     description={<Text>Данных нет</Text>}
//   />
// );

export const Layout = ({
  children
}: {
  children?: React.ReactNode;
}) => (
  <ErrorHandler>
    <AccountControlComponent>
      <AntdLayout>
        <Header className="antd-header">
          <NavMenu />
        </Header>
        <Content className="main-content-wrapper">
          {/* <ConfigProvider renderEmpty={customizeRenderEmpty}> */}
          {children}
          {/* </ConfigProvider> */}
        </Content>
        <Footer className="footer">
          © 2019
        </Footer>
      </AntdLayout>
      <div id="global-modals-container" />
    </AccountControlComponent>
  </ErrorHandler>
)
