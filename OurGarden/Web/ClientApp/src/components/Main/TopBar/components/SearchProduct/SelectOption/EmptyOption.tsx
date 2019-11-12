import React from "react";

import AutoComplete from "@core/antd/AutoComplete";

const { Option } = AutoComplete;

const EmptyOption = () => (
  <Option key="search-list-is-empty" className="search-list-is-empty" disabled>
    По вашему запросу ничего не найдено...
  </Option>
);

export default EmptyOption;
