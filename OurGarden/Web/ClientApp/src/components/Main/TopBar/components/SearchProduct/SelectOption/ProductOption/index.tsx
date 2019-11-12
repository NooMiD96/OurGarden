import React from "react";

import AutoComplete from "@core/antd/AutoComplete";

import { getProductPhotoSrc } from "@src/core/helpers/product";

import { IProductOption } from "./IProductOption";
import { IProduct } from "@src/components/Product/State";
import LazyImage from "@src/core/components/LazyImage";

const { Option } = AutoComplete;

const ProductOption = (item: IProductOption) => {
  let link = `/Catalog/${item.categoryId}`;

  if (item.subcategoryId) {
    link += `/${item.subcategoryId}`;
  }

  if (item.productId) {
    link += `/${item.productId}`;
  }

  let imgSrc = "";
  if (item.photo) {
    imgSrc = item.photo.url;
  } else if (item.photos) {
    imgSrc = getProductPhotoSrc(item as IProduct);
  }

  return (
    <Option className="search-menu-item" title={item.alias} key={link}>
      <LazyImage
        className="search-menu-item-image"
        src={imgSrc}
        alt={item.alias}
      />
      <span className="search-menu-item-text">{item.alias}</span>
    </Option>
  );
};

export default ProductOption;
