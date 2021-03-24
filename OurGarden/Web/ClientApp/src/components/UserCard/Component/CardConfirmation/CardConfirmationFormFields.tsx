import React from "react";

import { FormItem } from "@src/core/antd/Form";
import Input from "@src/core/antd/Input";
import Row from "@src/core/antd/Row";
import Col from "@src/core/antd/Col";
import PhoneNumberInput, {
  CISPhoneNumberRegExp,
} from "@src/core/components/PhoneNumberInput";
import Svg from "@src/core/components/Svg";

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
  xxl: { span: 8 },
};

const CardConfirmationFormFields = (props: ICardConfirmationFormFields) => {
  const { form, onSubmit } = props;
  const { isFieldTouched, getFieldError } = form;

  // prettier-ignore
  const phoneError
    = isFieldTouched("phoneNumber") && getFieldError("phoneNumber");

  return (
    <Row className="row-type-flex" gutter={24}>
      <Col {...colStyle}>
        <FormItem
          name="secondName"
          rules={[
            {
              required: true,
              message: "Введите вашу фамилию",
              transform: (val: string) => val && val.trim(),
            },
          ]}
        >
          <Input
            prefix={<Svg type="form-user" />}
            placeholder="Фамилия"
            onPressEnter={onSubmit}
          />
        </FormItem>
      </Col>

      <Col {...colStyle}>
        <FormItem
          name="firstName"
          rules={[
            {
              required: true,
              message: "Введите ваше имя",
              transform: (val: string) => val && val.trim(),
            },
          ]}
        >
          <Input
            prefix={<Svg type="form-user" />}
            placeholder="Имя"
            onPressEnter={onSubmit}
          />
        </FormItem>
      </Col>

      <Col {...colStyle}>
        <FormItem
          name="thirdName"
          rules={[{ transform: (val: string) => val && val.trim() }]}
        >
          <Input
            prefix={<Svg type="form-user" />}
            placeholder="Отчество"
            onPressEnter={onSubmit}
          />
        </FormItem>
      </Col>

      <Col {...colStyle}>
        <FormItem
          name="phone"
          rules={[
            {
              required: true,
              message: "Введите ваш контактный телефон",
              pattern: CISPhoneNumberRegExp,
            },
          ]}
          validateStatus={phoneError ? "error" : undefined}
        >
          <PhoneNumberInput
            placeholder="Телефон"
            prefix={<Svg type="form-phone" className="input-icon" />}
            onPressEnter={onSubmit}
          />
        </FormItem>
      </Col>

      <Col {...colStyle}>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: "Введите ваш контактный электронный адрес",
              type: "email",
              transform: (val: string) => val && val.trim(),
            },
          ]}
        >
          <Input
            placeholder="Почта"
            prefix={<Svg type="form-mail" className="input-icon" />}
            onPressEnter={onSubmit}
          />
        </FormItem>
      </Col>
    </Row>
  );
};

export default CardConfirmationFormFields;
