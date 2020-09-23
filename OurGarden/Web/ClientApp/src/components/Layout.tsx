import * as React from "react";
import ruRU from "antd/es/locale/ru_RU";

import AntdLayout from "@core/antd/Layout";
import ConfigProvider from "@core/antd/ConfigProvider";
import RenderEmptyProvider from "@core/components/RenderEmptyProvider";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import ModalWindow from "./ModalWindow";
import SeoHelmet from "./SeoHelmet";

import AppHOC from "@core/HOC/AppHOC";
import ErrorHandler from "@core/HOC/ErrorHandler";
import TopBar from "@components/Main/TopBar";
import Sider from "@components/Main/Sider";
import Breadcrumb from "@components/Breadcrumb";

import { MAIN_LAYOUT_GRID_COL_STYLE } from "@core/constants";

const { Header, Content } = AntdLayout;

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ErrorHandler>
      <Header className="antd-header">
        <Row className="row-type-flex">
          <Col {...MAIN_LAYOUT_GRID_COL_STYLE}>
            <TopBar />
          </Col>
        </Row>
      </Header>
      <AntdLayout className="antd-layout" hasSider>
        <Row className="row-type-flex">
          <Col {...MAIN_LAYOUT_GRID_COL_STYLE}>
            <Sider />
            <AntdLayout>
              <Content className="main-content-wrapper">
                <ConfigProvider locale={ruRU} renderEmpty={RenderEmptyProvider}>
                  <SeoHelmet />
                  <Breadcrumb />
                  <AppHOC>{children}</AppHOC>
                </ConfigProvider>
              </Content>
            </AntdLayout>
          </Col>
        </Row>
      </AntdLayout>
      <div id="global-modals-container" />
      <ModalWindow />
    </ErrorHandler>
  );
};
