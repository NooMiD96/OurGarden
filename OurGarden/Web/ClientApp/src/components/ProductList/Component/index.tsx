import React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Loading from "@core/components/Loading";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
import HeaderHelmet from "@src/core/components/Helmet";

import ProductCard from "./ProductCard";

import { getSEOMetaData } from "@src/core/utils/seoInformation";
import { displayNameFromId } from "@src/core/utils";

import "./style/ProductList.style.scss";

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

  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      productList
    } = this.props;

    if (
      !productList.length
      || params.categoryId !== productList[0].categoryId
      || params.subcategoryId !== productList[0].subcategoryId
    ) {
      props.getProductList(params.categoryId, params.subcategoryId);
    }

    this.state = {
      page: 1,
      pageSize: 6
    };
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: { params }
    } = this.props;

    if (prevProps.match.params !== params) {
      this.props.getProductList(params.categoryId, params.subcategoryId);
    }
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

    const seoSection = getSEOMetaData("productList");

    return (
      <div className="product-list-wrapper content">
        {pending ? (
          <>
            <Loading />
          </>
        ) : (
          <React.Fragment>
            <HeaderHelmet
              title={
                seoSection.title
                && productList[0]
                && seoSection.title.replace(
                  "{{value}}",
                  displayNameFromId(productList[0].subcategoryId)
                )
              }
              metaDescription={seoSection.meta}
            />
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
      </div>
    );
  }
}

export default ProductList;
