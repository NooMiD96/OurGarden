import * as React from "react";
import AntdLayout from "@core/antd/Layout";
const { Header, Content, Footer } = AntdLayout;
import { ConfigProvider, Empty } from "antd";
import { Text, Paragraph } from "@core/antd/Typography";

import AccountControlComponent from "@core/HOC/AccountControlComponent";
import NavMenu from "./NavMenu";

const customizeRenderEmpty = () => (
  <Empty
    description={<Text>Данных нет</Text>}
  />
);

export class Layout extends React.Component<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <AntdLayout>
          <Header className="antd-header">
            <NavMenu />
          </Header>
          <Content className="main-content-wrapper">
            <AccountControlComponent>
              <ConfigProvider renderEmpty={customizeRenderEmpty}>
                {this.props.children}
              </ConfigProvider>
            </AccountControlComponent>
          </Content>
          <Footer className="footer">
            <Paragraph>
              Адрес: г. Тула, ул. Эн, 0
            </Paragraph>
            <Paragraph>
              Телефон: 8 (4872) 00-00-00
            </Paragraph>
            <Paragraph>
              E-mail: med.sister@gmail.com
            </Paragraph>
            © 2019
          </Footer>
        </AntdLayout>
        <div
          id="global-modals-container"
        />
      </React.Fragment>
    );
  }
}
