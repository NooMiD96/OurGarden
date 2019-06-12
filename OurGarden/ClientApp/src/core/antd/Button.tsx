import * as React from "react";
import NativeButton, { NativeButtonProps, ButtonType } from "antd/es/button/button";
import "antd/es/button/style/index.css";

interface IButtonProps extends NativeButtonProps {
    // type?: ButtonType;
    href?: string;
}

const Button = (props: IButtonProps) => (
    <NativeButton
        {...props}
    />
);

export default Button;
