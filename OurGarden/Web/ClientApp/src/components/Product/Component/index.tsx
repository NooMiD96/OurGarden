import React from "react";

// import Alert from "@core/components/Alert";
import Layout from "@core/antd/Layout";

import HomeWrapper from "./style/Product.style";

import { TState, TComponentState } from "../TState";

const { Content } = Layout;

export class Product extends React.PureComponent<TState, TComponentState> {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { errorInner, cleanErrorInner } = this.props;

    return (
      <HomeWrapper>
        <Layout>
          <Content>hellow Product</Content>
        </Layout>
      </HomeWrapper>
    );
  }
}

export default Product;
