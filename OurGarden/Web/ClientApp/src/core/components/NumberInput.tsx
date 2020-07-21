import React from "react";

import Input, { InputProps } from "@core/antd/Input";

import { IKeyChangeEvent } from "@src/core/interfaces/IEvents";

interface INumberInput extends InputProps {
  value: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
}

class NumberInput extends React.Component<INumberInput, {}> {
  onChange = (e: IKeyChangeEvent) => {
    e.preventDefault();
    const { value } = e.target;
    // const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    const reg = /^([1-9][0-9]*)$/;

    // prettier-ignore
    if (
      (!Number.isNaN((value as any) as number) && reg.test(value))
      || value === ""
    ) {
      const { onValueChange } = this.props;
      onValueChange && onValueChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onValueChange } = this.props;

    if (value.charAt(value.length - 1) === "." || value === "-") {
      onValueChange && onValueChange(value.slice(0, -1));
    }

    if (value === "") {
      onValueChange && onValueChange("1");
    }

    if (onBlur) {
      onBlur();
    }
  };

  onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const props = { ...this.props };
    delete props.onValueChange;

    return (
      <Input
        {...props}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onClick={this.onClick}
        maxLength={25}
      />
    );
  }
}

export default NumberInput;
