import React from "react";

import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Loading from "@core/components/Loading";
import Pagination from "@core/antd/Pagination";
import PaginationItemRenderer from "@core/components/PaginationItemRenderer";
import HeaderHelmet from "@src/core/components/Helmet";

import ProductCard from "./ProductCard";

import { getSEOMetaData } from "@src/core/utils/seoInformation";
import { cardStyle } from "@core/components/CatalogCardList/CardStyle";

import "@core/components/CatalogCardList/style/CatalogCard.style.scss";

import { TState, TComponentState } from "../TState";

export class ProductList extends React.PureComponent<TState, TComponentState> {
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

    props.getBreadcrumb({
      categoryId: params.categoryId,
      subcategoryId: params.subcategoryId
    });

    this.state = {
      page: 1,
      pageSize: 6
    };
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: { params },
      getBreadcrumb
    } = this.props;

    if (prevProps.match.params !== params) {
      this.props.getProductList(params.categoryId, params.subcategoryId);

      getBreadcrumb({
        categoryId: params.categoryId,
        subcategoryId: params.subcategoryId
      });
    }
  }

  onChange = (page: number, pageSize: number = this.state.pageSize) => {
    this.setState({
      page,
      pageSize
    });
  };

  render() {
    const { productList, pending, push } = this.props;
    const { page, pageSize } = this.state;

    const dataList = productList.map((product) => ({
      ...product,
      link: `/Catalog/${product.categoryId}/${product.subcategoryId}/${product.productId}`
    }));

    const seoSection = getSEOMetaData("productList");

    return (
      <div className="product-list-wrapper catalog-card-list content">
        {pending ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {this.props.subcategory && (
              <HeaderHelmet
                title={
                  seoSection.title
                  && seoSection.title.replace(
                    "{{value}}",
                    this.props.subcategory.alias
                  )
                }
                metaDescription={seoSection.meta}
              />
            )}
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
              {dataList
                .slice((page - 1) * pageSize, page * pageSize)
                .map((item) => (
                  <Col {...cardStyle} key={item.link} className="card-wrapper">
                    <ProductCard pending={pending} product={item} push={push} />
                  </Col>
                ))}
            </Row>
          </>
        )}
      </div>
    );
  }
}

export default ProductList;
