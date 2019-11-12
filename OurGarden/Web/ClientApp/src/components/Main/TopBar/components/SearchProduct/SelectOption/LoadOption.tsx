import React from "react";

import LoadingIcon from "@src/core/icons/Loading";
import AutoComplete from "@core/antd/AutoComplete";

const { Option } = AutoComplete;

const LoadOption = () => (
  <Option key="loading-auto-select" className="loading-auto-select" disabled>
    <LoadingIcon />
  </Option>
);

export default LoadOption;
