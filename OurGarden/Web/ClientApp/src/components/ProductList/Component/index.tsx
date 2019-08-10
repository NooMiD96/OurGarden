import React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Loading from "@core/components/Loading";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
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
    xl: { span: 12 },
    // xxl	≥1600px
    xxl: { span: 8 }
  };

  state: TComponentState = {
    page: 1,
    pageSize: 6
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

  componentWillUnmount() {
    this.props.cleanProductList();
  }

  onChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page: page,
      pageSize: pageSize
    });
  };

  render() {
    const { productList, pending, push } = this.props;
    const { page, pageSize } = this.state;

    const dataList = productList.map(x => ({
      ...x,
      link: `/Каталог/${x.categoryId}/${x.subcategoryId}/${x.productId}`
    }));

    return (
      <ProductListWrapper className="content">
        {pending ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Pagination
              current={page}
              itemRender={PaginationItemRenderer}
              defaultCurrent={page}
              defaultPageSize={pageSize}
              showTitle={false}
              hideOnSinglePage
              total={dataList.length}
              onChange={this.onChange}
            />
            <Row type="flex" gutter={16}>
              {dataList.slice((page - 1) * pageSize, page * pageSize).map(x => (
                <Col {...this.cardStyle} key={x.link} className="card-wrapper">
                  <ProductCard pending={pending} product={x} push={push} />
                </Col>
              ))}
            </Row>
          </React.Fragment>
        )}
      </ProductListWrapper>
    );
  }
}

export default ProductList;
