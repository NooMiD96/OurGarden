import React from "react";

import LottieWebIcon from "@core/components/LottieWebIcon";
import AutoComplete from "@core/antd/AutoComplete";

const { Option } = AutoComplete;

const LoadOption = () => (
  <Option key="loading-auto-select" className="loading-auto-select" disabled>
    <LottieWebIcon type="loading" />
  </Option>
);

export default LoadOption;
