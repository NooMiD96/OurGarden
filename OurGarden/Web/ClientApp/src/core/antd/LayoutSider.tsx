import * as React from "react";
import AntdSider, {
  SiderProps as AntdSiderProps,
  CollapseType,
} from "antd/es/layout/Sider";
import "./Layout";

type ISider = AntdSiderProps;

const Sider = (props: ISider) => <AntdSider {...props} />;

export { CollapseType };

export default Sider;
