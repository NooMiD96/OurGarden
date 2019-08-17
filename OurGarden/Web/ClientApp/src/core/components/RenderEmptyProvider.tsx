import React from "react";

import { Text } from "@core/antd/Typography";
import Empty from "@core/antd/Empty";

const RenderEmptyProvider = () => (
  <Empty description={<Text>Данных нет</Text>} />
);

export default RenderEmptyProvider;
