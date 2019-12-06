import React from "react";
import { Link } from "react-router-dom";

import AutoComplete from "@core/antd/AutoComplete";
import LazyImage from "@core/components/LazyImage";

import { getPreviewPhotoSrc } from "@core/utils/photo";

import { IProductOption } from "./IProductOption";
import { ICategory } from "@components/Category/State";
import { ISubcategory } from "@components/Subcategory/State";
import { IProduct } from "@components/Product/State";

const { Option } = AutoComplete;

const ProductOption = (item: IProductOption) => {
  let link = `/Catalog/${item.categoryId}`;

  if (item.subcategoryId) {
    link += `/${item.subcategoryId}`;
  }

  if (item.productId) {
    link += `/${item.productId}`;
  }

  const imgSrc = getPreviewPhotoSrc(
    item as ICategory | ISubcategory | IProduct
  );

  return (
    <Option className="search-menu-item" title={item.alias} key={link}>
      <LazyImage
        className="search-menu-item-image"
        src={imgSrc}
        alt={item.alias}
      />
      <Link to={link} className="search-menu-item-text">
        {item.alias}
      </Link>
    </Option>
  );
};

export default ProductOption;
