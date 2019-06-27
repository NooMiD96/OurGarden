import * as React from "react";

import { Input } from "@src/core/antd";
import CustomIcon from "@core/antd/Icon";
import { Text } from "@src/core/antd/Typography";

// eslint-disable-next-line react/prefer-stateless-function
export class SearchProduct extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Input
          placeholder="Enter your username"
          prefix={<CustomIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </>
    );
  }
}

export default SearchProduct;
