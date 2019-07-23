import React from "react";

// import Alert from "@core/components/Alert";
import Layout from "@core/antd/Layout";

import ProductWrapper from "./style/Product.style";

import { TState, TComponentState } from "../TState";

const { Content } = Layout;

export class Product extends React.PureComponent<TState, TComponentState> {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { errorInner, cleanErrorInner } = this.props;

    return (
      <ProductWrapper>
        <Layout>
          <Content>hellow Product</Content>
        </Layout>
      </ProductWrapper>
    );
  }
}

export default Product;