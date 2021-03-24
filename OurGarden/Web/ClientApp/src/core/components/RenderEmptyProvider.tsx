import React from "react";

import Text from "@core/antd/Typography/Text";
import Empty from "@core/antd/Empty";

const RenderEmptyProvider = () => (
  <Empty description={<Text>Корзина пуста</Text>} />
);

export default RenderEmptyProvider;
