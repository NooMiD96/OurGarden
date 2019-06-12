import * as React from "react";
import Input, { InputProps } from "@core/antd/Input";
import {
  IKeyChangeEvent,
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";

type AddNewItemFieldProps = {
  inputFieldRef?: React.Ref<Input>,
  onSubmitHandler: (e: IPressEnterEvent | IMouseClickEvent) => void,
  onChangeHandler?: (e: IKeyChangeEvent) => void,
  text?: string,
  addonLabel?: string,
};

interface FullInputProps extends InputProps {
  ref?: React.Ref<Input>;
}

export default class AddNewItemField extends React.PureComponent<AddNewItemFieldProps, {}> {
  render() {
    const {
      onSubmitHandler,
      onChangeHandler,
      text,
      addonLabel,
      inputFieldRef,
    } = this.props;

    let inputProps: FullInputProps = {
      onPressEnter: onSubmitHandler,
    };

    if (onChangeHandler) {
      inputProps.onChange = onChangeHandler;
      inputProps.value = text;
    }

    if (addonLabel) {
      inputProps.addonBefore = (
        <span
          className="ant-input-group-addon-before"
          onClick={onSubmitHandler}
        >
          {addonLabel}
        </span>
      );
    }

    if (inputFieldRef) {
      inputProps.ref = inputFieldRef;
    }

    return (
      <Input
        {...inputProps}
      />
    );
  }
}
