import React from "react";
import AutoComplete from "@core/antd/AutoComplete";

const { Option } = AutoComplete;

const Product = ({
  key,
  title,
  imgSrc
}: {
  key: string;
  title: string;
  imgSrc: string;
}) => (
  <Option title={title} key={key}>
    <img src={imgSrc} style={{float: 'left'}} alt={title} />
    <div>
      Hellow
      {title}
    </div>
  </Option>
);

export default Product;
