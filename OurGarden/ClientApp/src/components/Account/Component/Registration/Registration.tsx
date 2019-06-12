import * as React from "react";
import { Icon, Input } from "@core/antd";
import Form, { FormItem, FormComponentProps } from "@core/antd/Form";

import ModalControlButtons from "../ModalControlButtons";

import { TRegistrationModel } from "../../TAccount";

import localeText from "../Text";

interface Props extends FormComponentProps {
  handleSubmit: (payload: TRegistrationModel) => void;
  handleСlose: () => void;
  loading: boolean;
}

export class Registration extends React.Component<Props, {}> {
  OnSubmit = () => {
    this.props.form.validateFields((err: any, values: TRegistrationModel & { confirm: string }) => {
      if (!err) {
        this.props.handleSubmit({
          userName: values.userName,
          email: values.email,
          password: values.password,
        });
        this.props.form.resetFields(["password", "confirm"]);
      }
    });
  }

  OnClose = () => {
    this.props.form.resetFields();
    this.props.handleСlose();
  }

  CompareToFirstPassword = (rule: any, value: string, callback: Function) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("2 пароля, которые Вы ввели, разные!");
    } else {
      callback();
    }
  }

  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="vertical" onSubmit={this.OnSubmit}>
        <FormItem
          label={localeText._label_userName}
        >
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: localeText._rule_require_userName }],
          })(
            <Input
              prefix={<Icon type="user" className="input-prefix-color" />}
              placeholder={localeText._label_userName}
              onPressEnter={this.OnSubmit}
            />
          )}
        </FormItem>
        <FormItem
          label={localeText._label_email}
        >
          {getFieldDecorator("email", {
            rules: [{
              type: "email", message: localeText._rule_type_email,
            }, {
              required: true, message: localeText._rule_require_email,
            }],
          })(
            <Input
              prefix={<Icon type="mail" className="input-prefix-color" />}
              type="email"
              placeholder={localeText._label_email}
              onPressEnter={this.OnSubmit}
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
              onPressEnter={this.OnSubmit}
            />
          )}
        </FormItem>
        <FormItem
          label={localeText._label_confirmPassword}
        >
          {getFieldDecorator("confirm", {
            rules: [{
              required: true,
              message: localeText._rule_require_confirmPassword,
            }, {
              validator: this.CompareToFirstPassword,
              message: localeText._rule_validator_email,
            }],
          })(
            <Input
              prefix={<Icon type="lock" className="input-prefix-color" />}
              type="password"
              placeholder={localeText._label_confirmPassword}
              onPressEnter={this.OnSubmit}
            />
          )}
        </FormItem>
        <div className="ant-modal-footer">
          <ModalControlButtons
            handleSubmit={this.OnSubmit}
            handleCancel={this.OnClose}
            loading={loading}
            returnTitle="Вернуться"
            submitTitle="Регистрация"
          />
        </div>
      </Form>
    );
  }
}
