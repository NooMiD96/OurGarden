import * as React from "react";
import AntdButton, {
  NativeButtonProps,
  ButtonType,
} from "antd/es/button/button";
import "antd/es/button/style/index.css";

interface IButtonProps extends NativeButtonProps {
  type?: ButtonType;
  href?: string;
}

const Button = (props: IButtonProps) => <AntdButton {...props} />;

export default Button;
