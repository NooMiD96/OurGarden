import React from "react";

import { TextArea } from "@core/antd/Input";
import Checkbox from "@core/antd/Checkbox";

import { IMetaDataFormProps, IMetaDataFormState } from "./IMetaDataForm";
import { CheckboxChangeEvent } from "antd/es/checkbox";

class MetaDataForm extends React.PureComponent<
  IMetaDataFormProps,
  IMetaDataFormState
> {
  state: IMetaDataFormState = {
    isEditable: !!this.props.value,
    metaValue: this.props.value!,
  };

  onEditableChange = (e: CheckboxChangeEvent) => {
    this.setState(
      {
        isEditable: e.target.checked,
      },
      () => {
        this.props.onChange!(
          this.state.isEditable ? this.state.metaValue : undefined
        );
      }
    );
  };

  onMetaValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState(
      {
        metaValue: e.target.value,
      },
      () => {
        this.props.onChange!(this.state.metaValue);
      }
    );
  };

  render() {
    const { isEditable, metaValue } = this.state;
    const {
      checkboxText,
      maxRows = 3,
      minRows = 5,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value: _value,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange: _onChange,
      ...props
    } = this.props;

    return (
      <React.Fragment>
        <Checkbox onChange={this.onEditableChange} defaultChecked={isEditable}>
          {checkboxText}
        </Checkbox>
        <TextArea
          disabled={!isEditable}
          defaultValue={metaValue}
          onChange={this.onMetaValueChange}
          autoSize={{ minRows, maxRows }}
          allowClear={maxRows !== minRows}
          {...props}
        />
      </React.Fragment>
    );
  }
}

export default MetaDataForm;
