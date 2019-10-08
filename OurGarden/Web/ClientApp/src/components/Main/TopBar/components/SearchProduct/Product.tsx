import React from "react";

import AutoComplete from "@core/antd/AutoComplete";

import { getProductPhotoSrc } from "@src/core/helpers/product";

import { ISearchItem } from "./ISearchProduct";
import { IProduct } from "@src/components/Product/State";

const { Option } = AutoComplete;

const style = {
  imgStyle: {
    maxWidth: "120px"
  },
  spanStyle: {
    fontSize: "16px",
    marginLeft: "0.5rem"
  }
};

const Product = (item: ISearchItem) => {
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
    <Option title={item.alias} key={link}>
      <img src={imgSrc} style={style.imgStyle} alt={item.alias} />
      <span style={style.spanStyle}>{item.alias}</span>
    </Option>
  );
};

export default Product;
