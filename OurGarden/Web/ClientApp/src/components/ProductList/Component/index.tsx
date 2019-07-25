import React from "react";

import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";
import ProductCard from "./ProductCard";

import ProductListWrapper from "./style/ProductList.style";

import { TState, TComponentState } from "../TState";

export class ProductList extends React.PureComponent<TState, TComponentState> {
  cardStyle = {
    // xs	<576px
    xs: { span: 24 },
    // sm	≥576px
    sm: { span: 24 },
    // md	≥768px
    // md: { span: 24 },
    // lg	≥992px
    lg: { span: 12 },
    // xl	≥1200px
    xl: { span: 8 }
    // xxl	≥1600px
    // xxl: { span: 8 }
  };

  componentDidMount() {
    const {
      match: { params },
      getProductList
    } = this.props;

    if (params.categoty && params.subcategory) {
      getProductList(params.categoty, params.subcategory);
    }
  }

  componentDidUpdate() {}

  render() {
    const { productList, pending, push } = this.props;

    const dataList = productList.map(x => ({
      ...x,
      link: `/Каталог/${x.categoryId}/${x.subcategoryId}/${x.productId}`
    }));

    return (
      <ProductListWrapper>
        <Row type="flex" gutter={16}>
          {dataList.map(x => (
            <Col {...this.cardStyle} key={x.link} className="card-wrapper">
              <ProductCard pending={pending} product={x} push={push} />
            </Col>
          ))}
        </Row>
      </ProductListWrapper>
    );
  }
}

export default ProductList;
