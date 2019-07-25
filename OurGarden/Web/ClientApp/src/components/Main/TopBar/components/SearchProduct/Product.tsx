import React from "react";

import AutoComplete from "@core/antd/AutoComplete";

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

const Product = (props: IProduct) => {
  const link = `/Каталог/${props.categoryId}/${props.subcategoryId}/${
    props.productId
  }`;

  return (
    <Option title={props.alias} key={link}>
      <img
        src={props.photos && props.photos[0].url}
        style={style.imgStyle}
        alt={props.alias}
      />
      <span style={style.spanStyle}>{props.alias}</span>
    </Option>
  );
};

export default Product;
