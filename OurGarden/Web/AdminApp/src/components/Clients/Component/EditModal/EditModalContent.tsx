import React from "react";

import Form, { FormItem } from "@core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import EditModalFooter from "@src/core/components/EditModalFooter";
import Checkbox from "@core/antd/Checkbox";
import PhoneNumberInput, {
  CISPhoneNumberRegExp
} from "@src/core/components/PhoneNumberInput";

import { IClient } from "../../State";
import { IPressEnterEvent } from "@src/core/IEvents";
import { IEditModalContentProps } from "./IEditModal";

export const EditModalContent = (props: IEditModalContentProps) => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const item = props.item || ({ isIncludeInMailing: true } as IClient);
  const { clientId, fio, email, isIncludeInMailing, phone } = item;

  const onSubmit = (e?: IPressEnterEvent | React.FormEvent) => {
    e && e.preventDefault();

    const email = form.getFieldValue("email");
    const fio = form.getFieldValue("fio");
    const phone = form.getFieldValue("phone");
    const isIncludeInMailing = form.getFieldValue("isIncludeInMailing");

    props.form.validateFields((err: any, _values: any) => {
      if (!err) {
        props.handleCreateSubmit({
          clientId,
          email,
          fio,
          phone,
          isIncludeInMailing
        });
      }
    });
  };

  const onClose = () => {
    form.resetFields();
    props.handleClose();
  };

  return (
    <Form layout="vertical" onSubmit={onSubmit}>
      <FormItem>
        {getFieldDecorator("fio", {
          initialValue: fio,
          rules: [
            {
              required: true,
              message: "Введите ФИО клиента",
              transform: (val: string) => val && val.trim()
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" className="input-prefix-color" />}
            placeholder="ФИО"
            onPressEnter={onSubmit}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("phone", {
          initialValue: phone,
          rules: [
            {
              required: true,
              message: "Введите контактный телефон клиета",
              pattern: CISPhoneNumberRegExp
            }
          ]
        })(
          <PhoneNumberInput
            placeholder="Телефон"
            prefix={<Icon type="phone" className="input-icon" />}
            onPressEnter={onSubmit}
          />
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator("isIncludeInMailing", {
          initialValue: isIncludeInMailing,
          valuePropName: "checked"
        })(<Checkbox>Отсылать клиету рассылку</Checkbox>)}
      </FormItem>

      <FormItem>
        {getFieldDecorator("email", {
          initialValue: email,
          rules: [
            {
              required: true,
              message: "Введите электронный адрес клиента",
              type: "email",
              transform: (val: string) => val && val.trim()
            }
          ]
        })(
          <Input
            prefix={<Icon type="mail" className="input-prefix-color" />}
            placeholder="Почта"
            onPressEnter={onSubmit}
          />
        )}
      </FormItem>

      <EditModalFooter onSubmit={onSubmit} onClose={onClose} />
    </Form>
  );
};

export default Form.create<IEditModalContentProps>()(EditModalContent);
