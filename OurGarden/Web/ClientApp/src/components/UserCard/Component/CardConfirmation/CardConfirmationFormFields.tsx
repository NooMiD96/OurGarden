import React from "react";

import { FormItem } from "@src/core/antd/Form";
import Icon from "@core/antd/Icon";
import Input from "@src/core/antd/Input";
import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";
import PhoneNumberInput, {
  CISPhoneNumberRegExp
} from "@src/core/components/PhoneNumberInput";

import { ICardConfirmationFormFields } from "./ICardConfirmation";

const colStyle = {
  // xs <576px
  xs: { span: 24 },
  // sm ≥576px
  sm: { span: 24 },
  // md ≥768px
  md: { span: 12 },
  // lg ≥992px
  lg: { span: 12 },
  // xl ≥1200px
  xl: { span: 8 },
  // xxl ≥1600px
  xxl: { span: 8 }
};

const CardConfirmationFormFields = (props: ICardConfirmationFormFields) => {
  const { form, onSubmit } = props;
  const { getFieldDecorator, isFieldTouched, getFieldError } = form;

  const phoneError
    = isFieldTouched("phoneNumber") && getFieldError("phoneNumber");

  return (
    <Row type="flex" gutter={24}>
      <Col {...colStyle}>
        <FormItem>
          {getFieldDecorator("secondName", {
            rules: [{ required: true, message: "Введите вашу фамилию", transform: (val: string) => val && val.trim() }]
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder="Фамилия"
              onPressEnter={onSubmit}
            />
          )}
        </FormItem>
      </Col>

      <Col {...colStyle}>
        <FormItem>
          {getFieldDecorator("firstName", {
            rules: [{ required: true, message: "Введите ваше имя", transform: (val: string) => val && val.trim() }]
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder="Имя"
              onPressEnter={onSubmit}
            />
          )}
        </FormItem>
      </Col>

      <Col {...colStyle}>
        <FormItem>
          {getFieldDecorator("thirdName", {rules: [{transform: (val: string) => val && val.trim()}]})(
            <Input
              prefix={<Icon type="user" />}
              placeholder="Отчество"
              onPressEnter={onSubmit}
            />
          )}
        </FormItem>
      </Col>

      <Col {...colStyle}>
        <FormItem validateStatus={phoneError ? "error" : undefined}>
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                message: "Введите ваш контактный телефон",
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
      </Col>

      <Col {...colStyle}>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Введите ваш контактный электронный адрес",
                type: "email",
                transform: (val: string) => val && val.trim()
              }
            ]
          })(
            <Input
              placeholder="Почта"
              prefix={<Icon type="mail" className="input-icon" />}
              onPressEnter={onSubmit}
            />
          )}
        </FormItem>
      </Col>
    </Row>
  );
};

export default CardConfirmationFormFields;
