import React from "react";

import Input from "@core/antd/Input";

import {
  IKeyChangeEvent,
  IPressEnterEvent,
} from "@src/core/interfaces/IEvents";
import { INumberInput } from "./interfaces/INumberInput";

class NumberInput extends React.Component<INumberInput, unknown> {
  inputRef: React.RefObject<Input> | null = null;

  onChange = (e: IKeyChangeEvent) => {
    e.preventDefault();
    const { value } = e.target;
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

  onPressEnter = (event: IPressEnterEvent) => {
    event.currentTarget.blur();
    this.props.onPressEnter && this.props.onPressEnter(event);
  };

  onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const props = { ...this.props };
    delete props.onValueChange;
    delete props.onPressEnter;

    return (
      <Input
        {...props}
        // @ts-ignore
        enterkeyhint="done"
        ref={this.inputRef}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onPressEnter={this.onPressEnter}
        maxLength={25}
      />
    );
  }
}

export default NumberInput;
