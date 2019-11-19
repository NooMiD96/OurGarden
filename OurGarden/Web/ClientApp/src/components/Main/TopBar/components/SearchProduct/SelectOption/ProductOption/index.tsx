import React from "react";

import AutoComplete from "@core/antd/AutoComplete";

import LazyImage from "@src/core/components/LazyImage";

import { getPreviewPhotoSrc } from "@src/core/utils/photo";

import { IProductOption } from "./IProductOption";
import { ICategory } from "@src/components/Category/State";
import { ISubcategory } from "@src/components/Subcategory/State";
import { IProduct } from "@src/components/Product/State";

const { Option } = AutoComplete;

const ProductOption = (item: IProductOption) => {
  let link = `/Catalog/${item.categoryId}`;

  if (item.subcategoryId) {
    link += `/${item.subcategoryId}`;
  }

  if (item.productId) {
    link += `/${item.productId}`;
  }

  const imgSrc = getPreviewPhotoSrc(item as ICategory | ISubcategory | IProduct);

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
