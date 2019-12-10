import * as React from "react";
import NativeButton, { NativeButtonProps, ButtonType } from "antd/lib/button/button";
import "antd/lib/button/style/index.css";

interface IButtonProps extends NativeButtonProps {
  type?: ButtonType;
  href?: string;
}

const Button = (props: IButtonProps) => (
  <NativeButton
    {...props}
  />
);

export default Button;
