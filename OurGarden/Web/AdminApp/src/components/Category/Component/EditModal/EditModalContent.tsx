import * as React from "react";

import Form, { FormItem, FormComponentProps } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";

// import ModalControlButtons from "../ModalControlButtons";

// import { TAuthenticationModel } from "../../TModel";

// import localeText from "../Text";

interface IProps extends FormComponentProps {
  // handleSubmit: (payload: TAuthenticationModel) => void;
  loading: boolean;
}

export const EditModalContent = (props: IProps) => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const onSubmit = () => {
    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        // props.handleSubmit({
        //   password: values.password,
        //   userName: values.userName,
        // });
        props.form.resetFields(["password"]);
      }
    });
  };

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
      <FormItem>
        {getFieldDecorator("userName", {
          rules: [
            { required: true, message: "localeText._rule_require_userName" }
          ]
        })(
          <Input
            prefix={<Icon type="user" className="input-prefix-color" />}
            // placeholder={localeText._label_userName}
            onPressEnter={onSubmit}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "localeText._rule_require_password" }
          ]
        })(
          <Input
            prefix={<Icon type="lock" className="input-prefix-color" />}
            type="password"
            // placeholder={localeText._label_password}
            onPressEnter={onSubmit}
          />
        )}
      </FormItem>
      <div className="ant-modal-footer">
        {/* <ModalControlButtons
          handleSubmit={onSubmit}
          loading={loading}
          submitTitle="Войти"
        /> */}
      </div>
    </Form>
  );
};

export default Form.create<IProps>()(EditModalContent);
