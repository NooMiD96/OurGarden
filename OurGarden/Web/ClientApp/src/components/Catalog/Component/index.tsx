import React from "react";

// import Alert from "@core/components/Alert";
import Layout from "@core/antd/Layout";

import HomeWrapper from "./style/Catalog.style";

import { TState, TComponentState } from "@components/Catalog/TState";

const { Content } = Layout;

export class Catalog extends React.PureComponent<TState, TComponentState> {
  render() {
    const {
      errorInner,
      cleanErrorInner,
    } = this.props;

    return (
      <HomeWrapper>
        <Layout>
          <Content>
            hellow Content
          </Content>
        </Layout>
      </HomeWrapper>
    );
  }
}

export default Catalog;
