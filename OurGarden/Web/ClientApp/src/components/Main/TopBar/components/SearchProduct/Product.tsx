import React from "react";

import AutoComplete from "@core/antd/AutoComplete";

import { IProduct } from "@src/components/Product/State";

const { Option } = AutoComplete;

const Product = (props: IProduct) => {
  const link = `/Каталог/${props.categoryId}/${props.subcategoryId}/${
    props.productId
  }`;

  return (
    <Option title={props.alias} key={link}>
      <img
        src={props.photos && props.photos[0].url}
        style={{ float: "left" }}
        alt={props.alias}
      />
      <div>{props.alias}</div>
    </Option>
  );
};

export default Product;
