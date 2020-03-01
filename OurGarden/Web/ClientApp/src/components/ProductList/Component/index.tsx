import React from "react";

import HeaderHelmet from "@core/components/Helmet";
import CatalogCardList from "@core/components/CatalogCardList";
import ProductCard from "@core/components/CatalogCardList/Cards/ProductCard";

import { getPreviewPhotoSrc } from "@core/utils/photo";

import { TState } from "../TState";

export class ProductList extends React.PureComponent<TState, {}> {
  constructor(props: TState) {
    super(props);

    const {
      match: { params },
      productList
    } = this.props;

    // prettier-ignore
    if (!props.isDataWasGeted) {
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
    }
  }

  componentDidUpdate(prevProps: TState) {
    const {
      match: { params },
      getBreadcrumb
    } = this.props;

    // prettier-ignore
    if (
      prevProps.match.params.categoryId !== params.categoryId
      || prevProps.match.params.subcategoryId !== params.subcategoryId
    ) {
      this.props.getProductList(params.categoryId, params.subcategoryId);

      getBreadcrumb({
        categoryId: params.categoryId,
        subcategoryId: params.subcategoryId
      });
    }
  }

  render() {
    const {
      subcategory,
      productList,
      push,
      replace,
      location: { state: locationState },
      ymId
    } = this.props;

    const dataList = productList.map((product) => ({
      ...product,
      link: `/Catalog/${product.categoryId}/${product.subcategoryId}/${product.productId}`,
      photoUrl: getPreviewPhotoSrc(product)
    }));

    return (
      <>
        {subcategory && (
          <HeaderHelmet
            seoSectionName="productList"
            seoTitle={[
              {
                replacementValue: subcategory.alias
              }
            ]}
          />
        )}
        <CatalogCardList
          dataList={dataList}
          push={push}
          replace={replace}
          locationState={locationState}
          cardComponent={(props) => (
            <ProductCard item={props.item} push={props.push} ymId={ymId} />
          )}
        />
      </>
    );
  }
}

export default ProductList;
