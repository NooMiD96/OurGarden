import * as React from "react";

import AccountControlComponent from "@core/HOC/AccountControlComponent";
import ErrorHandler from "@core/HOC/ErrorHandler";

import AntdLayout from "@core/antd/Layout";
import ConfigProvider from "@core/antd/ConfigProvider";
import RenderEmptyProvider from "@src/core/components/RenderEmptyProvider";
import NavMenu from "@components/NavMenu";

const { Content } = AntdLayout;

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <ErrorHandler>
    <AccountControlComponent>
      <AntdLayout>
        <NavMenu />
        <AntdLayout style={{ marginLeft: "200px" }}>
          <Content className="main-content-wrapper">
            <ConfigProvider renderEmpty={RenderEmptyProvider}>
              {children}
            </ConfigProvider>
          </Content>
        </AntdLayout>
      </AntdLayout>
      <div id="global-modals-container" />
    </AccountControlComponent>
  </ErrorHandler>
);
