import * as React from "react";
import { Icon, Input } from "@core/antd";
import Form, { FormItem, FormComponentProps } from "@core/antd/Form";

import ModalControlButtons from "../ModalControlButtons";

import { TAuthenticationModel } from "../../TAccount";

import localeText from "../Text";

interface Props extends FormComponentProps {
  handleSubmit: (payload: TAuthenticationModel) => void;
  handleСlose: () => void;
  loading: boolean;
}

export class Authentication extends React.Component<Props, {}> {
  onSubmit = () => {
    this.props.form.validateFields((err: any, values: TAuthenticationModel) => {
      if (!err) {
        this.props.handleSubmit({
          password: values.password,
          userName: values.userName,
        });
        this.props.form.resetFields(["password"]);
      }
    });
  }

  onClose = () => {
    this.props.form.resetFields();
    this.props.handleСlose();
  }

  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="vertical" onSubmit={this.onSubmit}>
        <FormItem
          label={localeText._label_userName}
        >
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: localeText._rule_require_userName }],
          })(
            <Input
              prefix={<Icon type="user" className="input-prefix-color" />}
              placeholder={localeText._label_userName}
              onPressEnter={this.onSubmit}
            />
          )}
        </FormItem>
        <FormItem
          label={localeText._label_password}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: localeText._rule_require_password }],
          })(
            <Input
              prefix={<Icon type="lock" className="input-prefix-color" />}
              type="password"
              placeholder={localeText._label_password}
              onPressEnter={this.onSubmit}
            />
          )}
        </FormItem>
        <div className="ant-modal-footer">
          <ModalControlButtons
            handleSubmit={this.onSubmit}
            handleCancel={this.onClose}
            loading={loading}
            returnTitle="Вернуться"
            submitTitle="Войти"
          />
        </div>
      </Form>
    );
  }
}
